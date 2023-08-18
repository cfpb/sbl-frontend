/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from "@hookform/resolvers/zod";
import useSblAuth from 'api/useSblAuth';
import {
  Button
} from 'design-stories';
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";


import Step1FormHeader from "./Step1FormHeader";

import InputEntry from "./InputEntry";
import { fiData } from './ProfileForm.data';

const financialInstitutionsSchema = z.object({
  label: z.string(),
  value: z.string(),
});

type FinancialInstitution = z.infer<typeof financialInstitutionsSchema>;

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

function Step1Form(): JSX.Element {
  const auth = useSblAuth();
  const email = auth.user?.profile.email;
  
  const defaultValues: ValidationSchema = {
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
    getValues,
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
          <InputEntry label="First name" id="firstName" register={register} errors={errors} isDisabled={false} />
          <InputEntry label="Last name" id="lastName" register={register} errors={errors} isDisabled={false} />
          <InputEntry label="Email address" id="email" register={register} errors={errors} isDisabled />
          
            
          <Button
            appearance="primary"
            onClick={async ()=>{
               const passesValidation = await trigger();
               if (passesValidation) {
                // TODO: Post the submission
               }
               console.log("validationResult:", validationResult)
                // console.log("getValues:", getValues())
                // console.log('onclick errors', errors);
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
