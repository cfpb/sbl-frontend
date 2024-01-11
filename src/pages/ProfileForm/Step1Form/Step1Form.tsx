/* eslint-disable jsx-a11y/label-has-associated-control */

import { zodResolver } from '@hookform/resolvers/zod';
import useSblAuth from 'api/useSblAuth';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

import AssociatedFinancialInstitutions from './AssociatedFinancialInstitutions';
import NoDatabaseResultError from './NoDatabaseResultError';
import FormParagraph from 'components/FormParagraph';
import FieldGroup from 'components/FieldGroup';

import { Button, Link, Paragraph, Heading } from 'design-system-react';

import { fiOptions, fiData } from 'pages/ProfileForm/ProfileForm.data';
import type {
  InstitutionDetailsApiType,
  InstitutionDetailsApiCheckedType,
  FinancialInstitutionRS,
  ValidationSchema,
} from 'pages/ProfileForm/types';
import {
  FormFields as formFields,
  validationSchema,
} from 'pages/ProfileForm/types';
import InputEntry from './InputEntry';
import Step1FormErrorHeader from './Step1FormErrorHeader';
import Step1FormHeader from './Step1FormHeader';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import useProfileForm from 'store/useProfileForm';
import Step1FormDropdownContainer from './Step1FormDropdownContainer';

import fetchInstitutions from 'api/fetchInstitutions';
import submitUserProfile from 'api/submitUserProfile';
import { formatUserProfileObject } from 'pages/ProfileForm/ProfileFormUtils';

function Step1Form(): JSX.Element {
  /* Initial- Fetch all institutions */
  const auth = useSblAuth();

  const email = auth.user?.profile.email;
  // eslint-disable-next-line unicorn/prefer-string-slice
  const emailDomain = email?.substring(email.lastIndexOf('@') + 1);
  const {
    isLoading,
    isError,
    data: afData,
  } = useQuery({
    queryKey: [`fetch-institutions-${emailDomain}`, emailDomain],
    queryFn: async () => fetchInstitutions(auth, emailDomain),
    enabled: !!emailDomain,
  });

  const defaultValues: ValidationSchema = {
    firstName: '',
    lastName: '',
    email: email ?? '',
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
    defaultValues,
  });

  const onSubmit: SubmitHandler<ValidationSchema> = data => {
    // TODO: decide if real-time input validation or on submit button click validation is better UX
    // console.log('data:', data);
  };

  /* Selected State - Start */
  // Associated Financial Institutions state
  const formatDataCheckedState = (
    fiDataInput: InstitutionDetailsApiType[] = [],
  ): InstitutionDetailsApiCheckedType[] =>
    fiDataInput.map(object => ({ ...object, checked: false }));
  const [checkedListState, setCheckedListState] = useState<
    InstitutionDetailsApiCheckedType[]
  >([]);

  useEffect(() => {
    const dataCheckedState = formatDataCheckedState(afData);
    setCheckedListState(dataCheckedState);
  }, [afData]);

  // Dropdown -- Financial Institutions state
  const [selectedFI, setSelectedFI] = useState<FinancialInstitutionRS[]>([]);
  /* Selected State - End */

  // Formatting: Checkmarking either the Associated Financial Institutions or the Dropdown Financial Institutions, adds to the react-hook-form object
  /* Format - Start */

  const getFinancialInstitutionsFormData = (
    checkedListState: InstitutionDetailsApiCheckedType[],
  ): InstitutionDetailsApiType[] => {
    const newFinancialInstitutions: InstitutionDetailsApiType[] = [];

    checkedListState.forEach((object: InstitutionDetailsApiCheckedType) => {
      if (object.checked) {
        const foundObject: InstitutionDetailsApiType = afData?.find(
          institutionsObject => object.lei === institutionsObject.lei,
        );
        newFinancialInstitutions.push(foundObject);
      }
    });

    // TODO: Added multiselected to list of selected institutions

    // selectedFI.forEach( (objectRS: FinancialInstitutionRS) => {
    //   const found = fiData.find(object => object.lei === objectRS.value);
    //   if (found) {
    //     newFinancialInstitutions.push(found);
    //   }
    // } );
    return newFinancialInstitutions;
  };

  useEffect(() => {
    const checkedFinancialInstitutions =
      getFinancialInstitutionsFormData(checkedListState);
    setValue('financialInstitutions', checkedFinancialInstitutions);
  }, [checkedListState, selectedFI]);
  /* Format - End */

  // Post Submission
  const setStep = useProfileForm(state => state.setStep);
  const setProfileData = useProfileForm(state => state.setProfileData);
  const enableMultiselect = useProfileForm(state => state.enableMultiselect);
  const isSalesforce = useProfileForm(state => state.isSalesforce);
  const onSubmitButtonAction = async (): Promise<void> => {
    // TODO: Handle error UX on submission failure or timeout
    const userProfileObject = getValues();
    const formattedUserProfileObject =
      formatUserProfileObject(userProfileObject);
    const passesValidation = await trigger();
    if (passesValidation) {
      const response = await submitUserProfile(
        auth,
        formattedUserProfileObject,
      );
      // TODO: workaround regarding UserProfile info not updating until reuath with keycloak
      // more investigation needed, see:
      // https://github.com/cfpb/sbl-frontend/issues/135
      await auth.signinSilent();
      window.location.href = '/landing';
    }
  };

  const navigate = useNavigate();

  // 'Clear Form' function
  function clearForm(): void {
    setValue('firstName', '');
    setValue('lastName', '');
    setSelectedFI([]);
    setCheckedListState(initialDataCheckedState);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!auth.user?.access_token) return <>Login first!</>;
  if (isLoading) return <>Loading Institutions!</>;
  if (isError) return <>Error on loading institutions!</>;

  return (
    <div id='step1form'>
      <div className='mb-[3.75rem] mt-[2.84375rem]'>
        <Step1FormHeader />
      </div>
      <Step1FormErrorHeader errors={formErrors} />
      <div className='mb-[1.625rem]'>
        <Heading type='2'>Provide your identifying information</Heading>
        <FormParagraph>
          Type your first name and last name in the fields below. Your email
          address is automatically populated from{' '}
          <Link href='#'>Login.gov</Link>.
        </FormParagraph>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-[3.75rem]'>
          <FieldGroup>
            <div className='mb-[1.875rem]'>
              <InputEntry
                label={formFields.firstName}
                id='firstName'
                {...register('firstName')}
                errors={formErrors}
                isDisabled={false}
              />
              <InputEntry
                label={formFields.lastName}
                id='lastName'
                {...register('lastName')}
                errors={formErrors}
                isDisabled={false}
              />
            </div>
            <InputEntry
              label={formFields.email}
              id='email'
              {...register('email')}
              errors={formErrors}
              isDisabled
              isLast
              hideInput
            >
              <Paragraph className='mb-0'>{email}</Paragraph>
            </InputEntry>
          </FieldGroup>
        </div>

        <Element name='financialInstitutions'>
          {isSalesforce ? null : (
            <>
              <div className='mb-[1.625rem]'>
                <Heading type='2'>
                  Select the institution you are authorized to file for
                </Heading>
                <FormParagraph>
                  You must select a financial institution to complete your
                  profile and access the platform.
                </FormParagraph>
              </div>
              <FieldGroup>
                <AssociatedFinancialInstitutions
                  errors={formErrors}
                  checkedListState={checkedListState}
                  setCheckedListState={setCheckedListState}
                />
                {enableMultiselect ? (
                  <Step1FormDropdownContainer
                    error={
                      formErrors.financialInstitutions
                        ? formErrors.financialInstitutions.message
                        : ''
                    }
                    options={fiOptions}
                    id='financialInstitutionsMultiselect'
                    onChange={newSelected => setSelectedFI(newSelected)} // TODO: use useCallback
                    label=''
                    isMulti
                    pillAlign='bottom'
                    placeholder=''
                    withCheckbox
                    showClearAllSelectedButton={false}
                    isClearable={false}
                    value={selectedFI}
                  />
                ) : null}
              </FieldGroup>
              {/* TODO: The below error occurs if the 'Get All Financial Instituions' fetch fails or fetches empty data */}
              {formErrors.fiData ? <NoDatabaseResultError /> : null}
            </>
          )}
          {isSalesforce ? (
            <>
              <div className='mb-[1.875rem]'>
                <Heading type='3'>Financial institution associations</Heading>
                <FormParagraph>
                  Please provide the name and LEI of the financial institution
                  you are authorized to file for and submit to our support staff
                  for processing. In order to access the filing platform you
                  must have an LEI for your financial institution.{' '}
                </FormParagraph>
              </div>
              <FieldGroup>
                <InputEntry
                  label='Financial institution name'
                  errors={formErrors}
                />
                <InputEntry label='LEI' errors={formErrors} />
                <InputEntry label='RSSD ID' errors={formErrors} />
                <InputEntry label='Additional details' errors={formErrors} />
              </FieldGroup>
            </>
          ) : null}
        </Element>

        <div className='mt-[1.875rem]'>
          <Button
            appearance='primary'
            onClick={onSubmitButtonAction}
            label='Submit'
            aria-label='Submit User Profile'
            size='default'
            type='button'
          />

          <div className='ml-[0.9375rem] inline-block'>
            <Button
              label='Clear form'
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
