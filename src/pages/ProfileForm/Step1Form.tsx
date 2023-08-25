/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from "@hookform/resolvers/zod";
import useSblAuth from 'api/useSblAuth';
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import NoDatabaseResultError from './NoDatabaseResultError';

import InputErrorMessage from "components/InputErrorMessage";
import { Button } from 'design-system-react';
import Select from "react-select";
import InputEntry from "./InputEntry";
import { fiData } from './ProfileForm.data';
import Step1FormErrorHeader from "./Step1FormErrorHeader";
import Step1FormHeader from "./Step1FormHeader";
import { formFields } from "./types";




const financialInstitutionsSchema = z.object({
  label: z.string(),
  value: z.string(),
});

type FinancialInstitution = z.infer<typeof financialInstitutionsSchema>;

const fiDataTypeSchema = z.object({
  bankName: z.string(),
  leiID: z.string(),
  agencyCode: z.number()
})

const fiOptions: FinancialInstitution[] = fiData.map(object => ({
  label: object.bankName,
  value: object.leiID,
}));

const validationSchema = z
  .object({
    firstName: z
      .string().min(1, { message: "You must enter your first name to complete your user profile and access the system." }),
    lastName: z
      .string().min(1, { message: "You must enter your last name to complete your user profile and access the system." }),
    email: z.string().min(5, { message: "You must have a valid email address" }).email({
      message: "You must have a valid email address and in the correct format.",
    }),
    financialInstitutions: financialInstitutionsSchema
      .array()
      .min(1, { message: "You must select at least one financial institution to complete your user profile and access the system." }),
    fiData: fiDataTypeSchema
      .array()
      .min(1, { message: "You should have associated financial institution information."})
  });

type ValidationSchema = z.infer<typeof validationSchema>;

function Step1Form(): JSX.Element {
  const auth = useSblAuth();
  const email = auth.user?.profile.email;
  
  const defaultValues: ValidationSchema = {
    firstName: "",
    lastName: "",
    email: email ?? "",
    financialInstitutions: [],
    // fiData: fiData ?? []
    fiData: []
  };
  
  const {
    register,
    handleSubmit,
    // setValue,
    trigger,
    // getValues,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log('data:', data);
  }

  console.log('errors:', errors)
  
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      outline: state.isFocused ? '0.25rem solid #2491ff !important' : '',
      outlineOffset: state.isFocused ? '0 !important' : ''
    }),
  };
  
  return (
    <>
      <Step1FormHeader />
      { errors && Object.keys(errors).length > 0 ? <Step1FormErrorHeader errors={errors} /> : null}
      <form
        className="bg-[#F7F8F9] p-[30px] border !border-cfpbBorderColor"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputEntry label={formFields.firstName} id="firstName" register={register} errors={errors} isDisabled={false} />
        <InputEntry label={formFields.lastName} id="lastName" register={register} errors={errors} isDisabled={false} />
        <InputEntry label={formFields.email} id="email" register={register} errors={errors} isDisabled>
          <p className="">Your email address is automatically pulled in from Login.gov.</p>
        </InputEntry>
        
        <div className="mt-8 mb-9">
          <h4 className="a-label a-label__heading">Associated financial institution(s)</h4>
          <p className="">Select the financial institution(s) that you are associated with.</p>
          <div className="">
            <Select 
              inputId="financialInstitutions"
              classNames={{
                control: (state) => `!rounded-none !border !w-full " : '!border-inherit' }`,
                indicatorSeparator: (state) => '!mb-0 !mt-0 !border-inherit',
                indicatorsContainer: (state) => '!bg-disabledColor',
                dropdownIndicator: (state) => '!text-inherit',
                valueContainer: ()=> `${ (errors.financialInstitutions ?? errors.fiData) ? "!border-errorColor !border-2 !border-solid" : ""}`,
              }} 
              options={fiOptions} 
              isSearchable
              placeholder=''
              styles={customStyles}
            />
          </div>
            {errors.financialInstitutions ? <p className="text-base text-errorColor">
            <InputErrorMessage>{errors.financialInstitutions.message}</InputErrorMessage>
          </p> : null}
          {errors.fiData ? <NoDatabaseResultError /> : null}
          
        </div>
        <Button
          appearance="primary"
          onClick={async ()=>{
            const passesValidation = await trigger();
            if (passesValidation) {
              // TODO: Post the submission
            }
            console.log("validationResult:", passesValidation)
              // console.log("getValues:", getValues())
              // console.log('onclick errors', errors);
            }}
          label="Submit"
          aria-label="Submit User Profile"
          size="default">
            Submit
        </Button>
        
        
      </form>
    </>
  );
}

export default Step1Form;