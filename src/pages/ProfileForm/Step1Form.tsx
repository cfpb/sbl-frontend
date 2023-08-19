/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from "@hookform/resolvers/zod";
import useSblAuth from 'api/useSblAuth';
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import WarningError from './WarningError';

import Select from "react-select";
import Step1FormHeader from "./Step1FormHeader";

import { Link } from 'design-stories';
import InputEntry from "./InputEntry";
import { fiData } from './ProfileForm.data';

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
      .string().min(1, { message: "First name is required" }),
    lastName: z
      .string().min(1, { message: "Last name is required" }),
    email: z.string().min(2, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    financialInstitutions: financialInstitutionsSchema
      .array()
      .min(1, { message: "Please pick at least one associated financial institution." }),
    fiData: fiDataTypeSchema
      .array()
      .min(1, { message: "You should have associated financial institution information."})

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
    financialInstitutions: [],
    // fiData: fiData ?? []
    fiData: []
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
  
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      outline: state.isFocused ? '0.25rem solid #2491ff !important' : '',
      outlineOffset: state.isFocused ? '0 !important' : ''
    }),
  };
  
  return (
    <div className="max-w-[1200px] mx-auto mb-12">
      <div className="max-w-[770px] mx-auto">
        <Step1FormHeader />
        <form
          className="bg-[#F7F8F9] p-4 border"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputEntry label="First name" id="firstName" register={register} errors={errors} isDisabled={false} />
          <InputEntry label="Last name" id="lastName" register={register} errors={errors} isDisabled={false} />
          <InputEntry label="Email address" id="email" register={register} errors={errors} isDisabled>
            <p className="">Your email address is automatically pulled in from Login.gov.</p>
          </InputEntry>
          
          <div className="mt-8 mb-9">
            <h4 className="text-[1.125em] font-medium tracking-[inherit] leading-tight mb-2 inline-block w-full">Associated financial institution(s)</h4>
            <p className="">Select the financial institution(s) that you are associated with.</p>
            <div className="mb-4">
              <Select 
                classNames={{
                  control: (state) => `!rounded-none !border !w-full " : '!border-inherit' }`,
                  indicatorSeparator: (state) => '!mb-0 !mt-0 !border-inherit',
                  indicatorsContainer: (state) => '!bg-[#E7E8E9]',
                  dropdownIndicator: (state) => '!text-inherit',
                  // input: (state) => state.isFocused ? "select-focused" : "",
                  valueContainer: ()=> `${ (errors.financialInstitutions ?? errors.fiData) ? "!border-[#D14124] !border-2 !border-solid" : ""}`,
                  // placeholder: ()=> '!border-none outline-none',
                }} 
                options={fiOptions} 
                placeholder=''
                styles={customStyles}
              />
            </div>
            {errors.fiData ? 
              <div className="flex flex-row gap-3">
                <WarningError />
                <div className='max-w-[600px]'>
                  <h4 className='text text-[14px] font-medium mb-[0.35rem] leading-[19px]'>No results found in our database.
                  </h4>
                  <p className='text text-[14px] leading-[0.95rem]'>The financial institution/LEI you search for war not found in our database. If you recently registered for an LEI with GLEIF, your registration may still be in process. if you need further assistance please <Link href="#">submit a technical question</Link> to our help desk.
                  </p>
                </div>
              </div>
   
            : null}
            
          </div>
          <button 
            className="bg-[#0072ce] text-white inline-block box-border cursor-pointer text-[1em] font-medium leading-[normal] text-center no-underline transition-[background-color] duration-[0.1s] m-0 px-[0.875em] py-[0.5em] border-0" 
            type="button"             
            onClick={async ()=>{
               const passesValidation = await trigger();
               if (passesValidation) {
                // TODO: Post the submission
               }
               console.log("validationResult:", passesValidation)
                // console.log("getValues:", getValues())
                // console.log('onclick errors', errors);
              }}>
              Submit
            </button>
              
          {/* <Button
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
            size="default">
              Submit
          </Button> */}
          
          
        </form>
      </div>
    </div>
  );
}

export default Step1Form;
