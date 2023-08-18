/* eslint-disable jsx-a11y/label-has-associated-control */
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

const financialInstitutionsSchema = z.object({
  label: z.string(),
  value: z.string(),
});

type FinancialInstitution = z.infer<typeof financialInstitutionsSchema>;

interface FiDataType {
  bankName: string;
  leiID: string;
  agencyCode: number;
}

const fiData: FiDataType[] = [
  {
    bankName: "Suntrust Banks, Inc",
    leiID: "7E1PDLW1JLaTSoBS1Go3",
    agencyCode: 3
  },
  {
    bankName: "JP Morgan, Inc",
    leiID: "8E1ODLE1JLaSVoBS1Bo2",
    agencyCode: 4
  },
    {
    bankName: "Bank of America, Inc",
    leiID: "3E89DLE1JBaLEoBS1Co1",
    agencyCode: 4
  },
];

const fiOptions: FinancialInstitution[] = fiData.map(object => ({
  label: object.bankName,
  value: object.leiID,
}));

const validationSchema = z
  .object({
    firstName: z
      .string().min(1, { message: "First name is required" }),
    lastName: z
      .string().min(1, { message: "Last name is required" }),
    email: z.string().min(2, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    financialInstitutions: financialInstitutionsSchema
      .array()
      .min(1, { message: "Please pick at least one associated financial institution" }),

    // password: z
    //   .string()
    //   .min(6, { message: "Password must be at least 6 characters" }),
    // confirmPassword: z
    //   .string()
    //   .min(1, { message: "Confirm Password is required" }),
    // terms: z.literal(true, {
    //   errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    // }),
  // })
  // .refine((data) => data.password === data.confirmPassword, {
  //   path: ["confirmPassword"],
  //   message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

type FormValues = z.infer<typeof validationSchema>;


function Step1Form(): JSX.Element {
  const auth = useSblAuth();
  const email = auth.user?.profile.email;
  
  const defaultValues: FormValues = {
    firstName: "",
    lastName: "",
    email: email ?? "",
    financialInstitutions: []
  };
  
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues
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
              className={`border w-full ${errors.firstName ? 'border-[#D14124] border-2': ""}`}
              {...register("firstName")}
            />
            {errors.firstName ? <p className="text-base text-[#D14124] mt-2">
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
              className={`border w-full ${errors.lastName ? 'border-[#D14124] border-2': ""}`}
              {...register("lastName")}
            />
            {errors.lastName ? <p className="text-base text-[#D14124] mt-2">
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
            <p className="text">Your email address is automatically pulled in from Login.gov.</p>

            <input
              type="text"
              id="email"
              className="border w-full disabled:bg-[#E7E8E9]"
              disabled
              {...register("email")}
            />
              {errors.email ? <p className="text-base text-[#D14124] mt-2">
              {errors.email.message}
            </p> : null}
          </div>
          
          <Button
            appearance="primary"
            onClick={()=>{
                // setValue('email', 'asdf@asdf.com')
                trigger();
                console.log('onclick errors', errors);
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
