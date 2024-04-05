import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TypeOf, z } from "zod";
import Input from "../../components/Input";
import InputUpload from "../../components/Input/InputUpload";
import Layout from "../../components/Layout";
import APICall from "../../config/axios";
import Button from "../../components/Button";

const contactSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  photo: z.string(),
});

type ContactInput = TypeOf<typeof contactSchema>;
const Contact = () => {
  const methods = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      photo: "",
    },
  });
  const { handleSubmit, setValue, watch } = methods;

  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [data, setData] = useState<Contact | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setValue("firstName", data?.firstName);
      setValue("lastName", data?.lastName);
      setValue("age", String(data?.age));
      setValue("photo", data?.photo);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (searchParams.get("id")) {
      getContact();
    }
  }, []);

  const getContact = async () => {
    setLoading(true);
    try {
      const response = await APICall.get(searchParams.get("id") ?? "");

      if (response.status === 200) {
        setData(response?.data?.data);
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
        navigate(-1);
      }
    }
  };

  const onSubmit = async (data: any) => {
    setSubmitLoading(true);
    try {
      let response;
      if (searchParams.get("id")) {
        response = await APICall.put(searchParams.get("id") ?? "", {
          ...data,
          firstName: data?.firstName?.replace(/\s/g, ""),
          lastName: data?.lastName?.replace(/\s/g, ""),
          photo: data?.photo ? data?.photo : "N/A",
        });
      } else {
        response = await APICall.post("", {
          ...data,
          firstName: data?.firstName?.replace(/\s/g, ""),
          lastName: data?.lastName?.replace(/\s/g, ""),
          photo: data?.photo ? data?.photo : "N/A",
        });
      }
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const onDelete = async () => {
    setSubmitLoading(true);
    try {
      await APICall.delete(searchParams.get("id") ?? "");
      navigate(-1);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSelectFile = (base64String: string) => {
    setValue("photo", base64String);
  };

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center mt-8">
          <div className="loader" />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            autoComplete="off"
            className="flex flex-col gap-4 p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="First Name"
              placeholder="Input first name"
              name="firstName"
              setValue={setValue}
            />
            <Input
              label="Last Name"
              placeholder="Input last name"
              name="lastName"
              setValue={setValue}
            />
            <Input
              label="Age"
              placeholder="Input age"
              name="age"
              setValue={setValue}
            />
            <InputUpload
              label={"Photo"}
              errorMessage={""}
              onSelectFile={handleSelectFile}
              defaultFile={watch("photo")}
            />
            {submitLoading ? (
              <div className="flex justify-center mt-4">
                <div className="loader" />
              </div>
            ) : (
              <>
                <Button type="submit" className="mt-16" loading={submitLoading}>
                  {searchParams.get("id") ? "Update" : "Add"}
                </Button>
                {searchParams?.get("id") ? (
                  <Button
                    className="!bg-red-500 hover:bg-red-500"
                    type="button"
                    onClick={onDelete}
                    loading={submitLoading}
                  >
                    Delete
                  </Button>
                ) : (
                  <div />
                )}
              </>
            )}
          </form>
        </FormProvider>
      )}
    </Layout>
  );
};

export default Contact;
