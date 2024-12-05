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
import type {
  PocFormHeaderErrorsType,
  VrsFormHeaderErrorsType,
} from 'components/FormErrorHeader.data';
import {
  PocFormHeaderErrors,
  VrsFormHeaderErrors,
} from 'components/FormErrorHeader.data';
import FormMain from 'components/FormMain';
import InputErrorMessage from 'components/InputErrorMessage';
import { Link } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import FilingNavButtons from 'pages/Filing/FilingApp/FilingNavButtons';
import FilingSteps from 'pages/Filing/FilingApp/FilingSteps';
import InstitutionHeading from 'pages/Filing/FilingApp/InstitutionHeading';
import { scrollToElement } from 'pages/ProfileForm/ProfileFormUtils';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { FilingType } from 'types/filingTypes';
import type {
  ContactInfoKeys,
  FilingDetailsSchema,
  FinancialInstitutionRS,
} from 'types/formTypes';
import { ContactInfoMap, filingDetailsSchema } from 'types/formTypes';
import { PhoneInputCharLimit, ZipInputCharLimit } from 'utils/constants';
import useAddressStates from 'utils/useAddressStates';
import useFilingStatus from 'utils/useFilingStatus';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import useSubmitPointOfContact from 'utils/useSubmitPointOfContact';
import useSubmitVoluntaryReporterStatus from 'utils/useSubmitVoluntaryReporterStatus';
import VoluntaryReporterStatus from './VoluntaryReporterStatus';
import {
  formatPointOfContactObject,
  formatVoluntaryReporterStatusObject,
} from './FilingDetailsUtils';
import FormParagraph from 'components/FormParagraph';

const defaultValuesPOC = {
  isVoluntary: undefined,
  firstName: '',
  lastName: '',
  phone: '',
  phoneExtension: '',
  email: '',
  hq_address_street_1: '',
  hq_address_street_2: '',
  hq_address_street_3: '',
  hq_address_street_4: '',
  hq_address_city: '',
  hq_address_state: '',
  hq_address_zip: '',
};

function FilingDetails(): JSX.Element {
  const formErrorHeaderId = 'FilingDetailsFormErrors';

  const [previousFilingDetailsValid, setPreviousFilingDetailsValid] =
    useState<boolean>(false);
  const [scrollTarget, setScrollTarget] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { lei, year } = useParams();

  /** Load Filing Status Data */
  const {
    data: filing,
    isLoading: isFilingLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: isErrorFilingStatus,
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  } = useFilingStatus(lei, year);

  /** Load Institution Details for the Filing Institution */
  const {
    data: institution,
    isLoading: isLoadingInstitution,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: isErrorInstitution,
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  } = useInstitutionDetails(lei);

  /** Load States or Territories for Select -- in options */
  const {
    data: stateOptions,
    isLoading: isLoadingStateOptions,
    // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: isErrorStateOptions,
  } = useAddressStates();

  /** Use Voluntary Reporter Status Submission */
  const { mutateAsync: mutateSubmitVoluntaryReporterStatus } =
    useSubmitVoluntaryReporterStatus({
      // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
      lei,
      // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
      filingPeriod: year,
    });

  /** Use Point Of Contact Submission */
  const { mutateAsync: mutateSubmitPointOfContact } = useSubmitPointOfContact({
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    lei,
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    filingPeriod: year,
  });

  /** Use Zod Form */
  const {
    register,
    watch,
    reset,
    trigger,
    getValues,
    setValue,
    formState: { errors: formErrors, isDirty },
  } = useForm<FilingDetailsSchema>({
    resolver: zodResolver(filingDetailsSchema),
    defaultValues: defaultValuesPOC,
  });

  /* ********************************************************* */
  /* Use Effects                                               */
  /* ********************************************************* */

  /** Determine total loading state when individual data loading states change */
  useEffect(() => {
    setIsLoading(
      isLoadingInstitution || isFilingLoading || isLoadingStateOptions,
    );
  }, [
    setIsLoading,
    isLoadingInstitution,
    isFilingLoading,
    isLoadingStateOptions,
  ]);

  /** Scrolls to configured target when the scroll target changes and is not empty.
   * Then resets the scroll target. This is done this way to debounce a bug where
   * the scroll doesn't work correctly when you clear the form and it has errors */
  useEffect(() => {
    if (scrollTarget) {
      scrollToElement(scrollTarget);
      setScrollTarget('');
    }
  }, [scrollTarget]);

  /** Populate form with pre-existing data, when it exists  */
  useEffect(() => {
    let shouldCheck = false;
    // Checks if the fetched contact info passes validation
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    const checkPreviousContactInfo = async (): void => {
      const passesValidation = await trigger();
      if (passesValidation) setPreviousFilingDetailsValid(true);
    };

    if (!filing) return;

    // Check is Voluntary
    const isVoluntary = (filing as FilingType).is_voluntary;

    if (typeof isVoluntary === 'boolean') {
      setValue('isVoluntary', isVoluntary);
      shouldCheck = true;
    }

    // check Contact Info
    const contactInfo = (filing as FilingType).contact_info;

    if (contactInfo) {
      for (const property of Object.keys(ContactInfoMap) as ContactInfoKeys[]) {
        const mappedProperty = ContactInfoMap[property];
        if (typeof property === 'string' && contactInfo[property]) {
          setValue(mappedProperty, contactInfo[property]);
        }
      }
      shouldCheck = true;
    }

    // Validate if need to
    if (shouldCheck) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      checkPreviousContactInfo();
    }
  }, [filing, setValue, trigger]);

  /* ********************************************************* */
  /* Change Handlers                                           */
  /* ********************************************************* */

  /** Handle change to Voluntary Reporter Status */
  const onVoluntaryReporterStatusChange = (selected: boolean): void => {
    setValue('isVoluntary', selected, { shouldDirty: true });
  };

  // Note: Design Choice to be made: ignore non-number input or just rely on error handling
  // const handlePhoneExtensionInput = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ): void => {
  //   setValue('phoneExtension', processNumbersOnlyString(event.target.value));
  // };

  /** Handle change to State selection */
  const onSelectState = ({ value }: { value: string }): void => {
    setValue('hq_address_state', value, { shouldDirty: true });
  };

  /* ********************************************************* */
  /* Nav Button Click Handlers                                 */
  /* ********************************************************* */

  const onClearform = (): void => {
    reset();
    setPreviousFilingDetailsValid(false); // If success alert is visible, this will disable it
    // Set the scroll target to the voluntary reporter containing div whch then triggers the scroll
    setScrollTarget('voluntary-reporter-status');
  };

  const onPreviousClick = (): void => {
    navigate(`/filing/${year}/${lei}/warnings`);
  };

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (
    event: React.FormEvent,
  ): Promise<void> => {
    event.preventDefault();
    const passesValidation = await trigger();

    if (!passesValidation) {
      setScrollTarget(formErrorHeaderId);
      return;
    }

    // Only need to hit API if the form passes validation and the data has changed
    if (isDirty) {
      try {
        setIsSubmitting(true);
        const preFormattedData = getValues();
        const formattedPOCObject = formatPointOfContactObject(preFormattedData);
        const formattedVRSObject =
          formatVoluntaryReporterStatusObject(preFormattedData);

        await mutateSubmitPointOfContact({ data: formattedPOCObject });
        await mutateSubmitVoluntaryReporterStatus({ data: formattedVRSObject });

        await queryClient.invalidateQueries({
          queryKey: [`fetch-filing-submission`, lei, year],
        });

        navigate(`/filing/${year}/${lei}/submit`);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      navigate(`/filing/${year}/${lei}/submit`);
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
            heading='Provide filing details'
            subheading="As required by the rule, you must indicate your voluntary reporter status and provide the name and business contact information of a person who the CFPB or other regulators may contact with questions about your financial institution's filing."
            description={
              <Paragraph>
                In order to continue to the next step, you are required to
                complete all fields with the exception of the fields labeled
                optional.
              </Paragraph>
            }
          />
        </FormHeaderWrapper>
        {previousFilingDetailsValid && Object.keys(formErrors).length === 0 ? (
          <Alert
            className='mb-[2.8125rem] [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
            message='Your filing details were successfully updated'
            status='success'
          />
        ) : null}
        <FormErrorHeader<
          FilingDetailsSchema,
          PocFormHeaderErrorsType & VrsFormHeaderErrorsType
        >
          alertHeading='There was a problem updating your filing details'
          errors={formErrors}
          id={formErrorHeaderId}
          formErrorHeaderObject={{
            ...VrsFormHeaderErrors,
            ...PocFormHeaderErrors,
          }}
          keyLogicFunc={normalKeyLogic}
        />
        {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <FormMain onSubmit={onSubmitButtonAction}>
          <VoluntaryReporterStatus
            value={watch('isVoluntary')}
            formErrors={formErrors}
            onChange={onVoluntaryReporterStatusChange}
          />
          <div className='mt-[3.75rem]'>
            <SectionIntro heading='Provide the point of contact for your filing'>
              Pursuant to <Links.RegulationB section='§ 1002.109(b)(3)' />,
              provide the name and business contact information of a person who
              may be contacted about your financial institution&apos;s filing.
              This information will not be published with your financial
              institution&apos;s data.
            </SectionIntro>
          </div>
          <FieldGroup>
            <FormParagraph className='mb-[1.875rem] text-grayDarker'>
              The Consumer Financial Protection Bureau (CFPB) is accepting data
              to test the functionality of the Small Business Lending Data
              Filing Platform.{' '}
              <Link href='/privacy-notice'>View Privacy Notice</Link>
            </FormParagraph>
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
            {/* Note: Phone and Phone Extension styling saved till a final decision */}
            {/* <div className='flex flex-col items-stretch bpMED:flex-row bpMED:gap-[0.9375rem]'> */}
            <InputEntry
              className='w-full bpMED:flex-[2]'
              label='Phone number'
              id='phone'
              type='tel'
              {...register('phone')}
              maxLength={PhoneInputCharLimit}
              helperText='Phone number must be in 555-555-5555 format.'
              errorMessage={formErrors.phone?.message}
              showError
            />
            <InputEntry
              className='w-full bpMED:flex-[1]'
              label='Phone extension'
              id='phoneExtension'
              helperText='Phone extension must not exceed 9 digits.'
              {...register('phoneExtension', {
                // onChange: handlePhoneExtensionInput,
              })}
              isOptional
              errorMessage={formErrors.phoneExtension?.message}
              showError
            />
            {/* </div> */}

            <InputEntry
              label='Email address'
              id='email'
              type='email'
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
              maxLength={ZipInputCharLimit}
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

FilingDetails.defaultProps = {
  onSubmit: undefined,
};

export default FilingDetails;
