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
import { useQueryClient } from '@tanstack/react-query';
import WrapperPageContent from 'WrapperPageContent';
import FormErrorHeader from 'components/FormErrorHeader';
import type { PocFormHeaderErrorsType } from 'components/FormErrorHeader.data';
import { PocFormHeaderErrors } from 'components/FormErrorHeader.data';
import FormMain from 'components/FormMain';
import FormParagraph from 'components/FormParagraph';
import InputErrorMessage from 'components/InputErrorMessage';
import { Link } from 'components/Link';
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
import { inputCharLimit } from 'utils/constants';
import useAddressStates from 'utils/useAddressStates';
import useFilingStatus from 'utils/useFilingStatus';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import useSubmitPointOfContact from 'utils/useSubmitPointOfContact';

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { lei, year } = useParams();
  const formErrorHeaderId = 'PointOfContactFormErrors';
  const {
    data: filing,
    isLoading: isFilingLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: isErrorFilingStatus,
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  } = useFilingStatus(lei, year);
  const {
    data: institution,
    isLoading: isLoadingInstitution,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: isErrorInstitution,
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  } = useInstitutionDetails(lei);

  // States or Territories -- in options
  const {
    data: stateOptions,
    isLoading: isLoadingStateOptions,
    // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
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
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
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

  const { mutateAsync: mutateSubmitPointOfContact } = useSubmitPointOfContact({
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    lei,
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    filingPeriod: year,
  });

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
        const formattedUserProfileObject =
          formatPointOfContactObject(preFormattedData);

        await mutateSubmitPointOfContact({ data: formattedUserProfileObject });

        await queryClient.invalidateQueries({
          queryKey: [`fetch-filing-submission`, lei, year],
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

  // TODO: Redirect the user if the filing period or lei are not valid

  if (isLoading) return <LoadingContent />;

  return (
    <div id='point-of-contact'>
      <WrapperPageContent className='my-[1.875rem]'>
        <InstitutionHeading
          headingType='4'
          name={institution?.name}
          filingPeriod={year}
        />
      </WrapperPageContent>
      <FilingSteps />
      <FormWrapper>
        <FormHeaderWrapper>
          <TextIntroduction
            heading='Provide point of contact'
            subheading="Provide the name and business contact information of a person that the Bureau or other regulators may contact with questions about your financial institution's filing."
            description={
              <Paragraph>
                Your financial institution&apos;s point of contact information
                will not be published with your financial institution&apos;s
                data. This information is required pursuant to{' '}
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
          alertHeading='There was a problem updating your point of contact information'
          errors={formErrors}
          id={formErrorHeaderId}
          formErrorHeaderObject={PocFormHeaderErrors}
          keyLogicFunc={normalKeyLogic}
        />
        <div className='mb-[1.875rem]'>
          <SectionIntro heading='Provide contact information for your filing'>
            You are required to complete all fields with the exception of the
            street address lines labeled optional. Your point of contact
            information will not be saved until you provide all required
            information and continue to the next step.
          </SectionIntro>
        </div>
        {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <FormMain onSubmit={onSubmitButtonAction}>
          <FieldGroup>
            <FormParagraph className='mb-[1.875rem] text-grayDarker'>
              The Consumer Financial Protection Bureau (CFPB) is collecting data
              to test the functionality of the Small Business Lending Data
              Filing Platform.{' '}
              <Link href='/privacy-notice'>View Privacy Notice</Link>
            </FormParagraph>
            <InputEntry
              label='First name'
              id='firstName'
              {...register('firstName')}
              maxLength={inputCharLimit}
              errorMessage={formErrors.firstName?.message}
              showError
            />
            <InputEntry
              label='Last name'
              id='lastName'
              {...register('lastName')}
              maxLength={inputCharLimit}
              errorMessage={formErrors.lastName?.message}
              showError
            />
            <div className='flex flex-col items-stretch bpMED:flex-row bpMED:gap-[0.9375rem]'>
              <InputEntry
                className='w-full bpMED:flex-[5]'
                label='Work phone number'
                id='phone'
                {...register('phone')}
                helperText='Phone number must be in 555-555-5555 format.'
                errorMessage={formErrors.phone?.message}
                showError
              />
              <InputEntry
                className='w-full bpMED:flex-[3]'
                label='Extension'
                id='phoneExtension'
                helperText='Extension should be a number.'
                {...register('phoneExtension')}
                maxLength={inputCharLimit}
                isOptional
              />
            </div>

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
                // Select TypeScript error -- needs to be fixed in DSR
                // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
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
          <FormButtonGroup isFilingStep>
            <FilingNavButtons
              classNameButtonContainer='u-mb0'
              // @ts-expect-error @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
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
