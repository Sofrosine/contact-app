import React, { FC, useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  errorMessage?: string;
  defaultFile?: string;
  onSelectFile: (base64File: string) => void;
}

const InputUpload: FC<Props> = ({
  label,
  errorMessage,
  defaultFile,
  onSelectFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    if (defaultFile) {
      setFile(defaultFile);
    }
  }, [defaultFile]);

  const handleSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type.startsWith("image/")) {
        const fileSizeInMB = selectedFile.size / (1024 * 1024); // Convert bytes to megabytes
        if (fileSizeInMB > 0.9) {
          alert("File size exceeds 900 KB limit.");
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            // Here you can pass the base64String to your onSelectFile function
            onSelectFile(base64String);
            setFile(base64String);
          };
          reader.readAsDataURL(selectedFile);
        }
      } else {
        // Handle invalid file type error
        console.error("Invalid file type. Please select an image file.");
      }
    }
  };
  return (
    <div>
      <label className="text-md font-bold">{label}</label>
      <div
        onClick={() => handleSelect()}
        className="flex flex-col p-4 border border-grey-2 rounded-2xl mt-2 items-center text-center hover:cursor-pointer"
      >
        {file ? (
          <img src={file} alt="" className="h-24 w-24 object-cover" />
        ) : (
          <img
            src={"/icons/IcUpload.svg"}
            alt=""
            className="h-[48px] w-[48px]"
          />
        )}

        <span className="mt-2 text-body-1 text-grey">
          Click to {file ? "edit" : "upload or drag and drop"}.
          <br />
          Max. 900 KB
        </span>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      {errorMessage && (
        <p className="text-body-2 text-error mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputUpload;
