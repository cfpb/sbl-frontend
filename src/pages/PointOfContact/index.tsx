import Links from 'components/CommonLinks';
import FieldGroup from 'components/FieldGroup';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import InputEntry from 'components/InputEntry';
import SectionIntro from 'components/SectionIntro';
import {
  Alert,
  Paragraph,
  SelectSingle,
  TextIntroduction,
} from 'design-system-react';
import { normalKeyLogic } from 'utils/getFormErrorKeyLogic';

import { zodResolver } from '@hookform/resolvers/zod';
import submitPointOfContact from 'api/requests/submitPointOfContact';
import useSblAuth from 'api/useSblAuth';
import FormErrorHeader from 'components/FormErrorHeader';
import type { PocFormHeaderErrorsType } from 'components/FormErrorHeader.data';
import { PocFormHeaderErrors } from 'components/FormErrorHeader.data';
import FormMain from 'components/FormMain';
import InputErrorMessage from 'components/InputErrorMessage';
import { LoadingContent } from 'components/Loading';
import FilingNavButtons from 'pages/Filing/FilingApp/FilingNavButtons';
import FilingSteps from 'pages/Filing/FilingApp/FilingSteps';
import InstitutionHeading from 'pages/Filing/FilingApp/InstitutionHeading';
import {
  formatPointOfContactObject,
  scrollToElement,
} from 'pages/ProfileForm/ProfileFormUtils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { FilingType } from 'types/filingTypes';
import type {
  ContactInfoKeys,
  FinancialInstitutionRS,
  PointOfContactSchema,
} from 'types/formTypes';
import { ContactInfoMap, pointOfContactSchema } from 'types/formTypes';
import useAddressStates from 'utils/useAddressStates';
import useFilingStatus from 'utils/useFilingStatus';
import useInstitutionDetails from 'utils/useInstitutionDetails';

const defaultValuesPOC = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  hq_address_street_1: '',
  hq_address_street_2: '',
  hq_address_street_3: '',
  hq_address_street_4: '',
  hq_address_city: '',
  hq_address_state: '',
  hq_address_zip: '',
};

function PointOfContact(): JSX.Element {
  const [previousContactInfoValid, setPreviousContactInfoValid] =
    useState<boolean>(false);
  const auth = useSblAuth();
  const navigate = useNavigate();
  const { lei, year } = useParams();
  const formErrorHeaderId = 'PointOfContactFormErrors';
  const {
    data: filing,
    isLoading: isFilingLoading,
    isError: isErrorFilingStatus,
  } = useFilingStatus(lei, year);
  const {
    data: institution,
    isLoading: isLoadingInstitution,
    isError: isErrorInstitution,
  } = useInstitutionDetails(lei);

  // States or Territories -- in options
  const {
    data: stateOptions,
    isLoading: isLoadingStateOptions,
    isError: isErrorStateOptions,
  } = useAddressStates();

  const isLoading = [
    isLoadingInstitution,
    isFilingLoading,
    isLoadingStateOptions,
  ].some(Boolean);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    watch,
    reset,
    trigger,
    getValues,
    setValue,
    formState: { errors: formErrors, isDirty },
  } = useForm<PointOfContactSchema>({
    resolver: zodResolver(pointOfContactSchema),
    defaultValues: defaultValuesPOC,
  });

  /** Populate form with pre-existing data, when it exists  */
  useEffect(() => {
    // Checks if the fetched contact info passes validation
    const checkPreviousContactInfo = async (): void => {
      const passesValidation = await trigger();
      if (passesValidation) setPreviousContactInfoValid(true);
    };

    if (!filing) return;

    const contactInfo = (filing as FilingType).contact_info;

    if (contactInfo) {
      for (const property of Object.keys(ContactInfoMap) as ContactInfoKeys[]) {
        const mappedProperty = ContactInfoMap[property];
        if (typeof property === 'string' && contactInfo[property]) {
          setValue(mappedProperty, contactInfo[property]);
        }
      }
      checkPreviousContactInfo();
    }
  }, [filing, setValue, trigger]);

  const onClearform = (): void => {
    reset();
    setValue('hq_address_state', '');
    scrollToElement('firstName');
    setPreviousContactInfoValid(false); // If success alert is visible, this will disable it
  };

  const onPreviousClick = (): void =>
    navigate(`/filing/${year}/${lei}/warnings`);

  const onSelectState = ({ value }: { value: string }): void => {
    setValue('hq_address_state', value, { shouldDirty: true });
  };

  // Navigate to Sign and Submit
  const navigateSignSubmit = (): void =>
    navigate(`/filing/${year}/${lei}/submit`);

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (
    event: React.FormEvent,
  ): Promise<void> => {
    event.preventDefault();
    const passesValidation = await trigger();

    if (!passesValidation) {
      scrollToElement(formErrorHeaderId);
      return;
    }

    // Only need to hit API if the form passes validation and the data has changed
    if (isDirty) {
      try {
        setIsSubmitting(true);
        const preFormattedData = getValues();
        // 1.) Sending First Name and Last Name to the backend
        const formattedUserProfileObject =
          formatPointOfContactObject(preFormattedData);

        await submitPointOfContact(auth, {
          data: formattedUserProfileObject,
          lei,
          filingPeriod: year,
        });

        navigateSignSubmit();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      navigateSignSubmit();
    }
  };

  const hasFormRegexErrors = Object.keys(formErrors).some(
    key =>
      formErrors[key as keyof PointOfContactSchema]?.type === 'invalid_string',
  );

  // TODO: Redirect the user if the filing period or lei are not valid

  if (isLoading) return <LoadingContent message='Loading Filing data...' />;

  return (
    <div id='point-of-contact'>
      <FilingSteps />
      <FormWrapper>
        <FormHeaderWrapper>
          <div className='mb-[0.9375rem]'>
            <InstitutionHeading
              eyebrow
              name={institution?.name}
              filingPeriod={year}
            />
          </div>
          <TextIntroduction
            heading='Provide point of contact'
            subheading="Provide the name and business contact information of a person that the Bureau or other regulators may contact with questions about your financial institution's data submission."
            description={
              <Paragraph>
                Your financial institution&apos;s point of contact information
                will not be published with your financial institution&apos;s
                data and pursuant to the rule will not be available to the
                general public. This information is required pursuant to{' '}
                <Links.RegulationB section='§ 1002.109(b)(3)' />.
              </Paragraph>
            }
          />
        </FormHeaderWrapper>
        {previousContactInfoValid && Object.keys(formErrors).length === 0 ? (
          <Alert
            className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
            message='Your point of contact information was successfully updated'
            status='success'
          />
        ) : null}
        <FormErrorHeader<PointOfContactSchema, PocFormHeaderErrorsType>
          alertHeading={
            hasFormRegexErrors
              ? 'There was a problem updating your point of contact information'
              : 'You must provide all required point of contact information to save and continue'
          }
          errors={formErrors}
          id={formErrorHeaderId}
          formErrorHeaderObject={PocFormHeaderErrors}
          keyLogicFunc={normalKeyLogic}
        />
        <div className='mb-[1.875rem]'>
          <SectionIntro heading='Provide contact information for your submission'>
            You are required to complete all fields with the exception of the
            street address lines labeled optional. Your point of contact
            information will not be saved until you provide all required
            information and click &quot;Save and continue.&quot;
          </SectionIntro>
        </div>
        {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <FormMain onSubmit={onSubmitButtonAction}>
          <FieldGroup>
            <InputEntry
              label='First name'
              id='firstName'
              {...register('firstName')}
              errorMessage={formErrors.firstName?.message}
              showError
            />
            <InputEntry
              label='Last name'
              id='lastName'
              {...register('lastName')}
              errorMessage={formErrors.lastName?.message}
              showError
            />
            <InputEntry
              label='Phone number'
              id='phone'
              {...register('phone')}
              helperText='Phone number must be in 555-555-5555 format.'
              errorMessage={formErrors.phone?.message}
              showError
            />
            <InputEntry
              label='Email address'
              id='email'
              {...register('email')}
              helperText='Email address must be in a valid format.'
              errorMessage={formErrors.email?.message}
              showError
            />
            <InputEntry
              label='Street address line 1'
              id='hq_address_street_1'
              {...register('hq_address_street_1')}
              errorMessage={formErrors.hq_address_street_1?.message}
              showError
            />
            <InputEntry
              label='Street address line 2'
              id='hq_address_street_2'
              {...register('hq_address_street_2')}
              isOptional
            />
            <InputEntry
              label='Street address line 3'
              id='hq_address_street_3'
              {...register('hq_address_street_3')}
              isOptional
            />
            <InputEntry
              label='Street address line 4'
              id='hq_address_street_4'
              {...register('hq_address_street_4')}
              isOptional
            />
            <InputEntry
              label='City'
              id='hq_address_city'
              {...register('hq_address_city')}
              errorMessage={formErrors.hq_address_city?.message}
              showError
            />
            <div className='mb-[1.875rem]'>
              <SelectSingle
                className={formErrors.hq_address_state?.message ? 'error' : ''}
                id='state'
                label='State or territory'
                defaultOptionLabel=''
                // @ts-expect-error Select TypeScript error -- needs to be fixed in DSR
                onChange={onSelectState}
                options={stateOptions as NonNullable<FinancialInstitutionRS[]>} // https://en.wikipedia.org/wiki/ISO_3166-2#Subdivisions_included_in_ISO_3166-1:~:text=US-,United%20States,-US%2DAS%20American
                value={watch('hq_address_state')}
              />
              <div>
                {formErrors.hq_address_state?.message ? (
                  <InputErrorMessage>
                    {formErrors.hq_address_state.message}
                  </InputErrorMessage>
                ) : null}
              </div>
            </div>
            <InputEntry
              label='ZIP code'
              id='zip'
              helperText='ZIP code must be in 55555 or 55555-5555 format.'
              isLast
              {...register('hq_address_zip')}
              errorMessage={formErrors.hq_address_zip?.message}
              showError
            />
          </FieldGroup>
          <FormButtonGroup>
            <FilingNavButtons
              classNameButtonContainer='u-mb0'
              onNextClick={onSubmitButtonAction}
              onPreviousClick={onPreviousClick}
              onClearClick={onClearform}
              isLoading={isSubmitting}
            />
          </FormButtonGroup>
        </FormMain>
      </FormWrapper>
    </div>
  );
}

PointOfContact.defaultProps = {
  onSubmit: undefined,
};

export default PointOfContact;
