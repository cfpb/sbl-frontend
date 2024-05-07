/* eslint-disable react/require-default-props */
import FieldGroup from 'components/FieldGroup';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import InputEntry from 'components/InputEntry';
import SectionIntro from 'components/SectionIntro';
import { Button, Select, TextIntroduction } from 'design-system-react';

import { normalKeyLogic } from 'utils/getFormErrorKeyLogic';

import { zodResolver } from '@hookform/resolvers/zod';
import submitPointOfContact from 'api/requests/submitPointOfContact';
import useSblAuth from 'api/useSblAuth';
import FormErrorHeader from 'components/FormErrorHeader';
import FormMain from 'components/FormMain';
import {
  formatPointOfContactObject,
  scrollToElement,
} from 'pages/ProfileForm/ProfileFormUtils';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import type { FilingType } from 'types/filingTypes';
import type { PointOfContactSchema } from 'types/formTypes';
import { pointOfContactSchema } from 'types/formTypes';
import useFilingStatus from 'utils/useFilingStatus';
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
  onSubmit?: () => void;
}

function PointOfContact({ onSubmit }: PointOfContactProperties): JSX.Element {
  const auth = useSblAuth();
  const { lei, year } = useParams();
  const formErrorHeaderId = 'PointOfContactFormErrors';
  const { data: filing, isLoading: isFilingLoading } = useFilingStatus(
    lei,
    year,
  );

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

    if (contactInfo?.first_name) setValue('firstName', contactInfo.first_name);
    if (contactInfo?.last_name) setValue('lastName', contactInfo.last_name);
    if (contactInfo?.phone_number) setValue('phone', contactInfo.phone_number);
    if (contactInfo?.email) setValue('email', contactInfo.email);
    if (contactInfo?.hq_address_street_1)
      setValue('hq_address_street_1', contactInfo.hq_address_street_1);
    if (contactInfo?.hq_address_street_2)
      setValue('hq_address_street_2', contactInfo.hq_address_street_2);
    if (contactInfo?.hq_address_street_3)
      setValue('hq_address_street_3', contactInfo.hq_address_street_3);
    if (contactInfo?.hq_address_street_4)
      setValue('hq_address_street_4', contactInfo.hq_address_street_4);
    if (contactInfo?.hq_address_city)
      setValue('hq_address_city', contactInfo.hq_address_city);
    if (contactInfo?.hq_address_state)
      setValue('hq_address_state', contactInfo.hq_address_state);
    if (contactInfo?.hq_address_zip)
      setValue('hq_address_zip', contactInfo.hq_address_zip);
  }, [filing, setValue]);

  const onClearform = (): void => {
    reset();
    setValue('hq_address_state', '');
    scrollToElement('firstName');
  };

  const onSelectState = ({ value }: { value: string }): void => {
    setValue('hq_address_state', value);
  };

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();
    if (passesValidation) {
      try {
        // Only need to hit the API if data has changed
        if (isDirty) {
          const preFormattedData = getValues();
          // 1.) Sending First Name and Last Name to the backend
          const formattedUserProfileObject =
            formatPointOfContactObject(preFormattedData);

          await submitPointOfContact(auth, {
            data: formattedUserProfileObject,
            lei,
            filingPeriod: year,
          });
        }

        if (onSubmit) onSubmit();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } else {
      scrollToElement(formErrorHeaderId);
    }
  };

  return (
    <div id='point-of-contact'>
      <FormWrapper>
        <FormHeaderWrapper>
          <TextIntroduction
            heading='Provide the point of contact'
            subheading='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
            description={
              <>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </>
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
        <FormMain>
          <FieldGroup>
            <InputEntry
              label='First name'
              id='firstName'
              {...register('firstName')}
              disabled={isFilingLoading}
            />
            <InputEntry
              label='Last name'
              id='lastName'
              {...register('lastName')}
              disabled={isFilingLoading}
            />
            <InputEntry
              label='Phone number'
              id='phone'
              {...register('phone')}
              disabled={isFilingLoading}
            />
            <InputEntry
              label='Email address'
              id='email'
              {...register('email')}
              disabled={isFilingLoading}
            />
            <InputEntry
              label='Street address line 1'
              id='hq_address_street_1'
              {...register('hq_address_street_1')}
              disabled={isFilingLoading}
            />
            <InputEntry
              label='Street address line 2'
              id='hq_address_street_2'
              {...register('hq_address_street_2')}
              disabled={isFilingLoading}
              isOptional
            />
            <InputEntry
              label='Street address line 3'
              id='hq_address_street_3'
              {...register('hq_address_street_3')}
              disabled={isFilingLoading}
              isOptional
            />
            <InputEntry
              label='Street address line 4'
              id='hq_address_street_4'
              {...register('hq_address_street_4')}
              disabled={isFilingLoading}
              isOptional
            />
            <InputEntry
              label='City'
              id='hq_address_city'
              {...register('hq_address_city')}
              disabled={isFilingLoading}
            />
            <div className='flex gap-[1.875rem]'>
              <div className='flex-1'>
                <Select
                  id='state'
                  label='State'
                  // @ts-expect-error Select TypeScript error -- needs to be fixed in DSR
                  onChange={onSelectState}
                  options={[
                    { label: '-- select an option --', value: '' },
                    ...statesObject.states,
                  ]}
                  value={watch('hq_address_state')}
                  disabled={isFilingLoading}
                />
              </div>
              <InputEntry
                className='flex-1'
                label='ZIP code'
                id='zip'
                {...register('hq_address_zip')}
                disabled={isFilingLoading}
              />
            </div>
          </FieldGroup>
          <FormButtonGroup>
            <Button
              appearance='primary'
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={onSubmitButtonAction}
              label='Save and continue'
              aria-label='Save and continue'
              size='default'
              type='button'
            />
            <Button
              label='Clear form'
              onClick={onClearform}
              appearance='warning'
              asLink
            />
          </FormButtonGroup>
        </FormMain>
      </FormWrapper>
    </div>
  );
}

export default PointOfContact;
