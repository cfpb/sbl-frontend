/* eslint-disable jsx-a11y/label-has-associated-control */

import { zodResolver } from "@hookform/resolvers/zod";
import useSblAuth from 'api/useSblAuth';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import AssociatedFinancialInstitutions from './AssociatedFinancialInstitutions';
import NoDatabaseResultError from './NoDatabaseResultError';
import FormParagraph from "components/FormParagraph"

import {
  Button,
  Link
} from 'design-system-react';
import fiData, { afData } from 'pages/ProfileForm/ProfileForm.data';
import type { FiDataChecked, FiDataType, FinancialInstitutionRS, ValidationSchema } from "pages/ProfileForm/types";
import { FormFields as formFields, validationSchema } from "pages/ProfileForm/types";
import InputEntry from "./InputEntry";
import Step1FormErrorHeader from "./Step1FormErrorHeader";
import Step1FormHeader from "./Step1FormHeader";

import useProfileForm from "store/useProfileForm";
import Step1FormDropdownContainer from "./Step1FormDropdownContainer";

import { fiOptions } from "../ProfileForm.data";

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
    setValue,
    trigger,
    getValues,
    formState: { errors: formErrors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log('data:', data);
  }
  


  /* Selected State - Start */
  // Associated Financial Institutions state
  const formatDataCheckedState = (fiDataInput: FiDataType[]): FiDataChecked[] => fiDataInput.map((object) => ({...object, checked: false}));
  const initialDataCheckedState = formatDataCheckedState(afData || []);
  const [checkedListState, setCheckedListState] = useState<FiDataChecked[]>(initialDataCheckedState);
  
  // Dropdown -- Financial Institutions state
  const [selectedFI, setSelectedFI] = useState<FinancialInstitutionRS[]>([]);
    /* Selected State - End */
  
  // Formatting: Checkmarking either the Associated Financial Institutions or the Dropdown Financial Institutions, adds to the react-hook-form object
  /* Format - Start */
  
  const getFinancialInstitutionsFormData = (checkedListState: FiDataChecked[], selectedFI: FinancialInstitutionRS[], fiData: FiDataType[]): FiDataType[] => {    
    const newFinancialInstitutions: FiDataType[] = [];
    
    checkedListState.forEach( (object: FiDataChecked) => {
      if (object.checked) {
        const fiDataObject: FiDataType = {
          name: object.name,
          lei: object.lei,
          taxID: object.taxID,
          agencyCode: object.agencyCode
        };
          
        newFinancialInstitutions.push(fiDataObject);
      }
    });
    
    selectedFI.forEach( (objectRS: FinancialInstitutionRS) => {
      const found = fiData.find(object => object.lei === objectRS.value);
      if (found) {
        newFinancialInstitutions.push(found);
      }
    } );
    
    return newFinancialInstitutions;
  }
  
  useEffect(()=>{
    setValue('financialInstitutions', getFinancialInstitutionsFormData(checkedListState, selectedFI, fiData));
  },[checkedListState, selectedFI]);
    /* Format - End */
    
    
  // Post Submission -- then navigate to Step2
  const setStep = useProfileForm((state) => state.setStep);
  const setProfileData = useProfileForm((state) => state.setProfileData);
  
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();
    if (passesValidation) {
      // TODO: Post the submission
      setProfileData(getValues())
      setStep(2)
    }
  }
  
  // 'Clear Form' function
  function clearForm(): void {
    setValue('firstName', "");
    setValue('lastName', "");
    setSelectedFI([]);
    setCheckedListState(initialDataCheckedState);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  const [selected, setSelected] = useState<FinancialInstitution[]>();
  
  return (
    <div id="step1form">
      <Step1FormHeader />
      { formErrors && Object.keys(formErrors).length > 0 ? <Step1FormErrorHeader errors={formErrors} /> : null}
      <form
        className="bg-[#F7F8F9] p-[30px] !border !border-solid !border-cfpbBorderColor"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputEntry label={formFields.firstName} id="firstName" {...register('firstName')}  errors={formErrors} isDisabled={false} />
        <InputEntry label={formFields.lastName} id="lastName" {...register('lastName')}  errors={formErrors} isDisabled={false} />
        <InputEntry label={formFields.email} id="email" {...register('email')}  errors={formErrors} isDisabled>
          <FormParagraph>Your email address is automatically pulled in from <Link href="#">Login.gov</Link>.</FormParagraph>
        </InputEntry>
        
        <div className="mt-8 mb-9">
          <h4 className="a-label a-label__heading">{formFields.financialInstitutions}</h4>
          <FormParagraph className="">The following institutions match your email domain. Select the available institutions you wish to file for. You may select more than one.</FormParagraph>
          {afData 
          ?           
            <>
              <AssociatedFinancialInstitutions checkedListState={checkedListState} setCheckedListState={setCheckedListState} />
              <FormParagraph>
                If you need to file for additional institutions not listed above, search and select the institutions you are associated with. 
              </FormParagraph>
            </> 
          : 
            null
          }
          
          {/* React-Select */}
          <Step1FormDropdownContainer 
            error={formErrors.financialInstitutions ? formErrors.financialInstitutions.message : ""} 
            options={fiOptions} 
            id="financialInstitutions"
            onChange={newSelected=>setSelectedFI(newSelected)} // TODO: use useCallback
            label=""
            isMulti
            pillAlign="bottom"
            placeholder=""
            withCheckbox
            showClearAllSelectedButton={false}
            isClearable={false}
            value={selectedFI}
          />
          {/* TODO: The below error occurs if the 'Get All Financial Instituions' fetch fails or fetches empty data */}
          {formErrors.fiData ? <NoDatabaseResultError /> : null}
          
        </div>
        <Button
          appearance="primary"
          onClick={onSubmitButtonAction}
          label="Submit"
          aria-label="Submit User Profile"
          size="default"
          >
            Submit
        </Button>
        
        <div className='ml-[15px] inline-block pill clear-selected'>
          <Button
            label="Clear form"
            onClick={clearForm}
            appearance='warning'
            asLink
          />
        </div>
        
        
      </form>
    </div>
  );
}

export default Step1Form;