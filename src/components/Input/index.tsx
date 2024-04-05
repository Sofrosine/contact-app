import clsx from "clsx";
import { FC } from "react";
import { Controller, UseFormSetValue, useFormContext } from "react-hook-form";

type Props = {
  label?: string; // The label text for the input field
  containerClassName?: string;
  name: string;
  setValue?: UseFormSetValue<any>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({
  label,
  name,
  disabled,
  containerClassName,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] ? errors[name]?.message : "";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div
            className={clsx(
              "flex flex-col space-y-0.5 text-black-text",
              containerClassName
            )}
          >
            <label htmlFor={name} className="text-md font-bold">
              {label}
            </label>
            <div className="flex relative items-center">
              <input
                {...props}
                {...field}
                disabled={disabled}
                value={field?.value}
                onChange={(e) => {
                  field.onChange(e);
                  // Add customize onchange here
                }}
                className={clsx(
                  "flex-1 text-body-1",
                  disabled && "text-grey-2"
                )}
              />
            </div>
            {error && (
              <div className="text-sm text-red-500">{error.toString()}</div>
            )}
          </div>
        );
      }}
    ></Controller>
  );
};

export default Input;
