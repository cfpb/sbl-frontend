/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ProfileFormHeader from "./ProfileFormHeader";

const validationSchema = z
  .object({
    firstName: z
      .string({
        required_error: "Firstname is required",
        invalid_type_error: "Firstname must be a string",
      })
      .min(2, { message: "Firstname must be at least 2 characters long" }),
    lastName: z.string().min(2, { message: "Lastname is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

function ProfileForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="max-w-[770px] mx-auto p-8">
        <ProfileFormHeader />
        <form
          className="bg-[#F7F8F9] p-4 border"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-8">
            <label
              htmlFor="firstName"
              className="text-[1.125em] font-medium tracking-[inherit] leading-tight mb-2 inline-block w-full"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="border w-full"
              placeholder=""
              {...register("firstName")}
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="lastName"
              className="text-[1.125em] font-medium tracking-[inherit] leading-tight mb-2 inline-block w-full"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="border w-full"
              placeholder=""
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
