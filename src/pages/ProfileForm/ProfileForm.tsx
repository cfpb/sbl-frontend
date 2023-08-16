/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ProfileFormHeader from "./ProfileFormHeader";

const validationSchema = z
  .object({
    firstName: z
      .string().min(2, { message: "First name must be at least 2 characters long" }),
    lastName: z
      .string().min(2, { message: "Last name must be at least 2 characters long" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    // password: z
    //   .string()
    //   .min(6, { message: "Password must be at least 6 characters" }),
    // confirmPassword: z
    //   .string()
    //   .min(1, { message: "Confirm Password is required" }),
    // terms: z.literal(true, {
    //   errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    // }),
  })
  // .refine((data) => data.password === data.confirmPassword, {
  //   path: ["confirmPassword"],
  //   message: "Password don't match",
  // });

type ValidationSchema = z.infer<typeof validationSchema>;

function ProfileForm() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log('data:', data);
    }

console.log('errors:', errors)
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
              {...register("lastName")}
            />
          </div>
          <button className="bg-[#0072ce] text-white inline-block box-border cursor-pointer text-[1em] font-medium leading-[normal] text-center no-underline transition-[background-color] duration-[0.1s] m-0 px-[0.875em] py-[0.5em] rounded-[0.25em] border-0" 
          type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
