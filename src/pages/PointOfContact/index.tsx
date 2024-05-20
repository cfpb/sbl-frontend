/* eslint-disable react/require-default-props */
import FieldGroup from 'components/FieldGroup';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import InputEntry from 'components/InputEntry';
import SectionIntro from 'components/SectionIntro';
import { Paragraph, Select, TextIntroduction } from 'design-system-react';

import { normalKeyLogic } from 'utils/getFormErrorKeyLogic';

import { zodResolver } from '@hookform/resolvers/zod';
import submitPointOfContact from 'api/requests/submitPointOfContact';
import useSblAuth from 'api/useSblAuth';
import FormErrorHeader from 'components/FormErrorHeader';
import FormMain from 'components/FormMain';
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
import type { ContactInfoKeys, PointOfContactSchema } from 'types/formTypes';
import { ContactInfoMap, pointOfContactSchema } from 'types/formTypes';
import useFilingStatus from 'utils/useFilingStatus';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import statesObject from './states.json';

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

interface PointOfContactProperties {
  onSubmit?: (success?: boolean) => void;
}

function PointOfContact({ onSubmit }: PointOfContactProperties): JSX.Element {
  const auth = useSblAuth();
  const navigate = useNavigate();
  const { lei, year } = useParams();
  const formErrorHeaderId = 'PointOfContactFormErrors';
  const { data: filing, isLoading: isFilingLoading } = useFilingStatus(
    lei,
    year,
  );
  const {
    data: institution,
    isLoading: isLoadingInstitution,
    isError: isErrorInstitution,
  } = useInstitutionDetails(lei);

  const isLoading = [isLoadingInstitution, isFilingLoading].some(Boolean);
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
    if (!filing) return;

    const contactInfo = (filing as FilingType).contact_info;

    if (contactInfo) {
      for (const property of Object.keys(ContactInfoMap) as ContactInfoKeys[]) {
        const mappedProperty = ContactInfoMap[property];
        if (typeof property === 'string' && contactInfo[property]) {
          setValue(mappedProperty, contactInfo[property]);
        }
      }
    }
  }, [filing, setValue]);

  const onClearform = (): void => {
    reset();
    setValue('hq_address_state', '');
    scrollToElement('firstName');
  };

  const onPreviousClick = (): void =>
    navigate(`/filing/${year}/${lei}/warnings`);

  const onSelectState = ({ value }: { value: string }): void => {
    setValue('hq_address_state', value);
  };

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (
    event: React.FormEvent,
  ): Promise<void> => {
    event.preventDefault();
    const passesValidation = await trigger();
    // Only need to hit API if the form passes validation and the data has changed
    if (passesValidation && isDirty) {
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

        if (onSubmit) onSubmit(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        if (onSubmit) onSubmit(false);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      scrollToElement(formErrorHeaderId);
    }
  };

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
            heading='Provide the point of contact'
            subheading='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
            description={
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </Paragraph>
            }
          />
        </FormHeaderWrapper>
        <FormErrorHeader
          errors={formErrors}
          id={formErrorHeaderId}
          keyLogicFunc={normalKeyLogic}
        />
        <div className='mb-[1.875rem]'>
          <SectionIntro heading='Provide the point of contact for your submission'>
            Enter the name and business contact information of a person who may
            be contacted by the Bureau or other regulators with questions about
            your financial institution&apos;s submission.
          </SectionIntro>
        </div>
        {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <FormMain onSubmit={onSubmitButtonAction}>
          <FieldGroup>
            <InputEntry
              label='First name'
              id='firstName'
              {...register('firstName')}
            />
            <InputEntry
              label='Last name'
              id='lastName'
              {...register('lastName')}
            />
            <InputEntry
              label='Phone number'
              id='phone'
              {...register('phone')}
            />
            <InputEntry
              label='Email address'
              id='email'
              {...register('email')}
            />
            <InputEntry
              label='Street address line 1'
              id='hq_address_street_1'
              {...register('hq_address_street_1')}
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
            />
            <div className='flex gap-[1.875rem]'>
              <div className='flex-1'>
                <Select
                  id='state'
                  label='State'
                  // @ts-expect-error Select TypeScript error -- needs to be fixed in DSR
                  onChange={onSelectState}
                  options={statesObject.states}
                  value={watch('hq_address_state')}
                />
              </div>
              <InputEntry
                className='flex-1'
                label='ZIP code'
                id='zip'
                {...register('hq_address_zip')}
              />
            </div>
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

export default PointOfContact;
