/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button
} from 'design-stories';
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useSblAuth from 'api/useSblAuth';


import Step1FormHeader from "./Step1FormHeader";

const validationSchema = z
  .object({
    firstName: z
      .string().min(1, { message: "First name is required" }),
    lastName: z
      .string().min(1, { message: "Last name is required" }),
    email: z.string().min(2, { message: "Email is required" }).email({
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

function Step1Form(): JSX.Element {
  const auth = useSblAuth() ?? {};
  const email = auth.user?.profile.email;
  
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: email ?? ""
    }
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log('data:', data);
    }


  console.log('errors:', errors)
  
  return (
    <div className="max-w-[1200px] mx-auto mb-10">
      <div className="max-w-[770px] mx-auto">
        <Step1FormHeader />
        <form
          className="bg-[#F7F8F9] p-4 border"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6">
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
            {errors.firstName ? <p className="text-base text-red-500 mt-2">
              {errors.firstName.message}
            </p> : null}
          </div>

          <div className="mb-6">
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
            {errors.lastName ? <p className="text-base text-red-500 mt-2">
              {errors.lastName.message}
            </p> : null}
          </div>
          
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-[1.125em] font-medium tracking-[inherit] leading-tight mb-2 inline-block w-full"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              className="border w-full disabled:bg-[#E7E8E9]"
              disabled
              {...register("email")}
            />
          </div>
          
          {/* <button className="bg-[#0072ce] text-white inline-block box-border cursor-pointer text-[1em] font-medium leading-[normal] text-center no-underline transition-[background-color] duration-[0.1s] m-0 px-[0.875em] py-[0.5em] rounded-[0.25em] border-0" 
          type="submit">Submit</button> */}
           {/* <button className="bg-[#0072ce] text-white inline-block box-border cursor-pointer text-[1em] font-medium leading-[normal] text-center no-underline transition-[background-color] duration-[0.1s] m-0 px-[0.875em] py-[0.5em] rounded-[0.25em] border-0" 
          type="button" onClick={()=>{
            setValue('email', 'asdf@asdf.com')
            trigger();
          }}>Add Email</button> */}
          <Button
            appearance="primary"
            onClick={()=>{
                // setValue('email', 'asdf@asdf.com')
                trigger();
              }}
            label="Submit"
            size="default">
              Submit
          </Button>
          
          
        </form>
      </div>
    </div>
  );
}

export default Step1Form;
