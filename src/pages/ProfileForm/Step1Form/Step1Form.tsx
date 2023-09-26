/* eslint-disable jsx-a11y/label-has-associated-control */

import { zodResolver } from "@hookform/resolvers/zod";
import useSblAuth from 'api/useSblAuth';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import AssociatedFinancialInstitutions from './AssociatedFinancialInstitutions';
import NoDatabaseResultError from './NoDatabaseResultError';

import {
  Button
} from 'design-system-react';
import { afData } from 'pages/ProfileForm/ProfileForm.data';
import type { FiDataChecked, FiDataType, ValidationSchema } from "pages/ProfileForm/types";
import { FormFields as formFields, validationSchema } from "pages/ProfileForm/types";
import InputEntry from "./InputEntry";
import Step1FormErrorHeader from "./Step1FormErrorHeader";
import Step1FormHeader from "./Step1FormHeader";

import useProfileForm from "store/useProfileForm";
import Step1FormDropdownContainer from "./Step1FormDropdownContainer";

import type { FinancialInstitution } from "../types";
import { fiOptions } from "../types";

function Step1Form(): JSX.Element {
  const auth = useSblAuth();
  const email = auth.user?.profile.email;
  
  const defaultValues: ValidationSchema = {
    firstName: "",
    lastName: "",
    email: email ?? "",
    financialInstitutions: [],
  };
  
  const {
    register,
    handleSubmit,
    // setValue,
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

  console.log('form errors:', errors)
  
  const setStep = useProfileForm((state) => state.setStep);
  
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();
    if (passesValidation) {
      // TODO: Post the submission
    }
    console.log("validationResult:", passesValidation)
    // console.log("getValues:", getValues())
    // console.log('onclick errors', errors);
    const values = getValues();
    if (values.firstName && values.lastName) {
      setStep(2)
    }
  }

  
  // Associated Financial Institutions state
  const formatDataCheckedState = (fiDataInput: FiDataType[]): FiDataChecked[] => fiDataInput.map((object) => ({...object, checked: false}));
  const [checkedListState, setCheckedListState] = useState<FiDataChecked[]>(formatDataCheckedState(afData || []));
  
  // Dropdown -- Financial Institutions state
  const [selectedFI, setSelectedFI] = useState<FinancialInstitution[]>([]);
  
  // Formatting: Checkmarking either the Associated Financial Institutions or the Dropdown Financial Institutions, adds to the react-hook-form object
  useEffect(()=>{
    console.log('checkedListState: ', checkedListState);
    console.log('selectedFI: ', selectedFI);
    
    
  },[checkedListState, selectedFI]);
  
  return (
    <div>
      <Step1FormHeader />
      { errors && Object.keys(errors).length > 0 ? <Step1FormErrorHeader errors={errors} /> : null}
      <form
        className="bg-[#F7F8F9] p-[30px] border !border-formBorderColor"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputEntry label={formFields.firstName} id="firstName" {...register('firstName')}  errors={errors} isDisabled={false} />
        <InputEntry label={formFields.lastName} id="lastName" {...register('lastName')}  errors={errors} isDisabled={false} />
        <InputEntry label={formFields.email} id="email" {...register('email')}  errors={errors} isDisabled>
          <p className="">Your email address is automatically pulled in from Login.gov.</p>
        </InputEntry>
        
        <div className="mt-8 mb-9">
          <h4 className="a-label a-label__heading">{formFields.financialInstitutions}</h4>
          <p className="">Select the financial institution(s) that you are associated with.</p>
          {afData ? <AssociatedFinancialInstitutions checkedListState={checkedListState} setCheckedListState={setCheckedListState} /> : null}
          <p className="">If you need to file for additional institutions not listed above, search and select the institutions you are associated with.</p>
          {/* React-Select */}
          <Step1FormDropdownContainer 
            error={errors.financialInstitutions ? errors.financialInstitutions.message : ""} 
            options={fiOptions} 
            id="financialInstitutions"
            onChange={newSelected=>setSelectedFI(newSelected)} // TODO: use useCallback
            label=""
            labelClearAll = 'Clear All Selected Institutions'
            isMulti
            pillAlign="bottom"
            placeholder=""
            withCheckbox
            showClearAllSelectedButton
            isClearable={false}
            value={selectedFI}
            // menuIsOpen
          />
          {/* TODO: The below error occurs if the 'Get All Financial Instituions' fetch fails or fetches empty data */}
          {errors.fiData ? <NoDatabaseResultError /> : null}
          
        </div>
        <Button
          appearance="primary"
          onClick={onSubmitButtonAction}
          label="Submit"
          aria-label="Submit User Profile"
          size="default"
          // type="submit"
          >
            Submit
        </Button>
        
        
      </form>
    </div>
  );
}

export default Step1Form;