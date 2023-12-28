/* eslint-disable jsx-a11y/label-has-associated-control */

import { zodResolver } from "@hookform/resolvers/zod";
import useSblAuth from 'api/useSblAuth';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Element } from 'react-scroll';

import AssociatedFinancialInstitutions from './AssociatedFinancialInstitutions';
import NoDatabaseResultError from './NoDatabaseResultError';
import FormParagraph from "components/FormParagraph";
import FieldGroup from "components/FieldGroup";
import InputErrorMessage from 'components/InputErrorMessage';

import {
  Button,
  Link
} from 'design-system-react';

import { useQuery } from '@tanstack/react-query';
import { fetchInstitutionDetails } from 'src/api/fetchInstitutionDetails';
import fiData, { afData, fiOptions } from 'pages/ProfileForm/ProfileForm.data';
import type { FiDataChecked, FiDataType, FinancialInstitutionRS, ValidationSchema } from "pages/ProfileForm/types";
import { FormFields as formFields, validationSchema } from "pages/ProfileForm/types";
import InputEntry from "./InputEntry";
import Step1FormErrorHeader from "./Step1FormErrorHeader";
import Step1FormHeader from "./Step1FormHeader";

import useProfileForm from "store/useProfileForm";
import Step1FormDropdownContainer from "./Step1FormDropdownContainer";

import fetchInstitutions from 'api/fetchInstitutions';
import submitUserProfile from 'api/submitUserProfile';
import { formatUserProfileObject } from "pages/ProfileForm/ProfileFormUtils";

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
    // TODO: decide if real-time input validation or on submit button click validation is better UX
    // console.log('data:', data);
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
          rssID: object.rssID
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
    const checkedFinancialInstitutions = getFinancialInstitutionsFormData(checkedListState, selectedFI, fiData);
    setValue('financialInstitutions', checkedFinancialInstitutions);
  },[checkedListState, selectedFI]);
    /* Format - End */
    
    
  // Post Submission
  const setStep = useProfileForm((state) => state.setStep);
  const setProfileData = useProfileForm((state) => state.setProfileData);
  const enableMultiselect = useProfileForm((state) => state.enableMultiselect);
  const isSalesforce = useProfileForm((state) => state.isSalesforce);
  const onSubmitButtonAction = async (): Promise<void> => {
    // TODO: Handle error UX on submission failure or timeout
    const userProfileObject = getValues();
    const formattedUserProfileObject = formatUserProfileObject(userProfileObject);
    const passesValidation = await trigger();
    if (passesValidation) {
      const response = await submitUserProfile(auth, formattedUserProfileObject);
      setProfileData(userProfileObject);
      // TODO: Navigate to the 'landing' page
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
  
  /* Initial- Fetch all institutions */
  const { isLoading, isError, data } = useQuery(
    [`Institutions-All`],
    async () => fetchInstitutions(auth)
  );

  if (isLoading) return <>Loading Institutions!</>;
  if (isError) return <>Error on loading institutions!</>;
  
  console.log('data: ', data);

  return (
    <div id="step1form">
      <Step1FormHeader />
      <Step1FormErrorHeader errors={formErrors} />
      <h3>Provide your identifying information</h3>
      <FormParagraph>Type your first name and last name in the fields below. Your email address is automatically populated from <Link href="#">Login.gov</Link>.</FormParagraph>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <InputEntry label={formFields.firstName} id="firstName" {...register('firstName')}  errors={formErrors} isDisabled={false} />
          <InputEntry label={formFields.lastName} id="lastName" {...register('lastName')}  errors={formErrors} isDisabled={false} />
          <InputEntry label={formFields.email} id="email" {...register('email')}  errors={formErrors} isDisabled />
        </FieldGroup>
        
        <Element name="financialInstitutions">
        {
          isSalesforce ?
          null
          :
          <>
            <div className="mt-8 mb-9">
              <h3>Select the financial institution you are authorized to file for</h3>
              <FormParagraph>If there is a match between your email domain and the email domain of a financial institution in our system you will see a list of matches below. </FormParagraph>
            </div>
            <FieldGroup>
              <AssociatedFinancialInstitutions errors={formErrors} checkedListState={checkedListState} setCheckedListState={setCheckedListState} />
              {enableMultiselect ?
                <Step1FormDropdownContainer 
                  error={formErrors.financialInstitutions ? formErrors.financialInstitutions.message : ""} 
                  options={fiOptions} 
                  id="financialInstitutionsMultiselect"
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
                : null
              }
              
              {/* TODO: The below error occurs if the 'Get All Financial Instituions' fetch fails or fetches empty data */}
              {formErrors.fiData ? <NoDatabaseResultError /> : null}
            </FieldGroup>  
            {formErrors['financialInstitutions'] ? (
              <div>
                <InputErrorMessage>{formErrors['financialInstitutions'].message}</InputErrorMessage>
              </div>
            ) : null}
          </>
        }
        {
          isSalesforce ?
          <>
            <div className="mt-8 mb-9">
              <h3>Financial institution associations</h3>
              <FormParagraph>Please provide the name and LEI of the financial institution you are authorized to file for and submit to our support staff for processing. In order to access the filing platform you must have an LEI for your financial institution. </FormParagraph>
            </div>
            <FieldGroup>
              <InputEntry label='Financial institution name' errors={formErrors} />
              <InputEntry label='LEI' errors={formErrors} />
              <InputEntry label='RSSD ID' errors={formErrors} />
              <InputEntry label='Additional details' errors={formErrors} />
            </FieldGroup>  
          </>
          :
          null
        }
        </Element>
        
        <div className="mt-[30px]">
          <Button
            appearance="primary"
            // TODO: Route to SBLhelp/Salesforce on no associated LEIs: https://github.com/cfpb/sbl-frontend/issues/99
            onClick={onSubmitButtonAction}
            label="Submit"
            aria-label="Submit User Profile"
            size="default"
            type='button'
          />
          
          <div className='ml-[15px] inline-block'>
            <Button
              label="Clear form"
              onClick={clearForm}
              appearance='warning'
              asLink
            />
          </div>
        </div>
        
        
      </form>
    </div>
  );
}

export default Step1Form;