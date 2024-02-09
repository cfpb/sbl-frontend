/* eslint-disable jsx-a11y/label-has-associated-control */

import { zodResolver } from '@hookform/resolvers/zod';
import useSblAuth from 'api/useSblAuth';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Element } from 'react-scroll';

import FieldGroup from 'components/FieldGroup';
import FormParagraph from 'components/FormParagraph';
import SectionIntro from 'components/SectionIntro';
import AssociatedFinancialInstitutions from './AssociatedFinancialInstitutions';
import NoDatabaseResultError from './NoDatabaseResultError';

import { Button, Heading, Paragraph } from 'design-system-react';

import FormButtonGroup from 'components/FormButtonGroup';

import FormErrorHeader from 'components/FormErrorHeader';
import InputEntry from 'components/InputEntry';
import { fiOptions } from 'pages/ProfileForm/ProfileForm.data';
import type {
  FinancialInstitutionRS,
  InstitutionDetailsApiCheckedType,
  InstitutionDetailsApiType,
  ValidationSchema,
} from 'pages/ProfileForm/types';
import {
  FormFields as formFields,
  validationSchema,
} from 'pages/ProfileForm/types';

import { useQuery } from '@tanstack/react-query';
import useAppState from 'store/useAppState';
import useProfileForm from 'store/useProfileForm';
import Step1FormDropdownContainer from './Step1FormDropdownContainer';

import { fetchInstitutions, submitUserProfile } from 'api/requests';
import {
  formatDataCheckedState,
  formatUserProfileObject,
  scrollToErrorForm,
} from 'pages/ProfileForm/ProfileFormUtils';
import Step1FormHeader from './Step1FormHeader';
import Step1FormInfoHeader from './Step1FormInfoHeader';

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
    setValue,
    trigger,
    getValues,
    formState: { errors: formErrors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  /* Selected State - Start */
  // Associated Financial Institutions state
  const [checkedListState, setCheckedListState] = useState<
    InstitutionDetailsApiCheckedType[]
  >([]);

  useEffect(() => {
    if (afData) {
      const dataCheckedState = formatDataCheckedState(afData);
      setCheckedListState(dataCheckedState);
    }
  }, [afData]);

  // Dropdown -- Financial Institutions state
  const [selectedFI, setSelectedFI] = useState<FinancialInstitutionRS[]>([]);
  /* Selected State - End */

  const getFinancialInstitutionsFormData = useCallback(
    (
      checkedListStateArray: InstitutionDetailsApiCheckedType[],
    ): InstitutionDetailsApiType[] => {
      const newFinancialInstitutions: InstitutionDetailsApiType[] = [];

      for (const object of checkedListStateArray) {
        if (object.checked) {
          // ts-expect-error TS error due to using Zod infer
          const foundObject: InstitutionDetailsApiType = afData.find(
            institutionsObject => object.lei === institutionsObject.lei,
          );
          newFinancialInstitutions.push(foundObject);
        }
      }

      // TODO: Added multiselected to list of selected institutions

      // selectedFI.forEach( (objectRS: FinancialInstitutionRS) => {
      //   const found = fiData.find(object => object.lei === objectRS.value);
      //   if (found) {
      //     newFinancialInstitutions.push(found);
      //   }
      // } );
      return newFinancialInstitutions;
    },
    [afData],
  );

  useEffect(() => {
    const checkedFinancialInstitutions =
      getFinancialInstitutionsFormData(checkedListState);
    setValue('financialInstitutions', checkedFinancialInstitutions);
  }, [
    checkedListState,
    selectedFI,
    getFinancialInstitutionsFormData,
    setValue,
  ]);
  /* Format - End */

  const navigate = useNavigate();

  const enableMultiselect = useProfileForm(state => state.enableMultiselect);
  const isSalesforce = useAppState(state => state.isSalesforce);

  // 'Clear Form' function
  function clearForm(): void {
    setValue('firstName', '');
    setValue('lastName', '');
    setSelectedFI([]);
    setCheckedListState(formatDataCheckedState(afData));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Used for error scrolling
  const formErrorHeaderId = 'step1FormErrorHeader';

  // Post Submission
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
      // navigate('/landing')
    } else {
      // on errors scroll to Step1FormErrorHeader
      scrollToErrorForm(formErrorHeaderId);
    }
  };

  // Based on useQuery states
  if (!auth.user?.access_token) return <>Login first!</>;
  if (isLoading) return <>Loading Institutions!</>;
  if (isError) return <>Error on loading institutions!</>;

  return (
    <div id='step1form'>
      <Step1FormHeader crumbTrailMarginTop={false} />
      <FormErrorHeader errors={formErrors} id={formErrorHeaderId} />
      <Step1FormInfoHeader />
      <form>
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
              <SectionIntro heading='Select the institution for which you are authorized to file'>
                If there is a match between your email domain and the email
                domain of a financial institution in our system you will see a
                list of matches below.
              </SectionIntro>
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

        <FormButtonGroup>
          <Button
            appearance='primary'
            onClick={onSubmitButtonAction}
            label='Submit'
            aria-label='Submit User Profile'
            size='default'
            type='button'
          />

          <Button
            className='ml-[0.9375rem] inline-block'
            label='Clear form'
            onClick={clearForm}
            appearance='warning'
            asLink
          />
        </FormButtonGroup>
      </form>
    </div>
  );
}

export default Step1Form;
