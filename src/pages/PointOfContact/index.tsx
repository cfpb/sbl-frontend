import FieldGroup from 'components/FieldGroup';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import InputEntry from 'components/InputEntry';
import SectionIntro from 'components/SectionIntro';
import { Button, Select, TextIntroduction } from 'design-system-react';

import { zodResolver } from '@hookform/resolvers/zod';
import submitPointOfContact from 'api/requests/submitPointOfContact';
import useSblAuth from 'api/useSblAuth';
import FormMain from 'components/FormMain';
import { formatPointOfContactObject } from 'pages/ProfileForm/ProfileFormUtils';
import { useForm } from 'react-hook-form';
import type { PointOfContactSchema } from 'types/formTypes';
import { pointOfContactSchema } from 'types/formTypes';
import statesObject from './states.json';

function PointOfContact(): JSX.Element {
  const auth = useSblAuth();
  const {
    register,
    // control,
    reset,
    trigger,
    getValues,
    setValue,
    formState: { errors: formErrors },
  } = useForm<PointOfContactSchema>({
    resolver: zodResolver(pointOfContactSchema),
    // defaultValues,
  });

  const onSelectState = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }): void => {
    console.log('selected', label);
    setValue('hq_address_state', value);
  };

  window.getValues = getValues;
  console.log('point of contact form errors:', formErrors);

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();
    if (passesValidation) {
      try {
        const preFormattedData = getValues();
        // 1.) Sending First Name and Last Name to the backend
        const formattedUserProfileObject =
          formatPointOfContactObject(preFormattedData);
        // TODO: Need to link a LEI and a PERIOD
        await submitPointOfContact(auth, formattedUserProfileObject);
        console.log('Point of Contact Submitted');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } else {
      // scrollToElement('point-of-contact');
    }
  };

  return (
    <FormWrapper>
      <div id='point-of-contact'>
        <FormHeaderWrapper crumbTrailMarginTop={false}>
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
              id='hq_address_street_1'
              {...register('hq_address_street_2')}
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
                  onChange={onSelectState}
                  options={[
                    { label: '-- select an option --', value: '' },
                    ...statesObject.states,
                  ]}
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
            <Button
              appearance='primary'
              onClick={onSubmitButtonAction}
              label='Save and continue'
              aria-label='Save and continue'
              size='default'
              type='button'
            />
            <Button
              label='Clear form'
              // onClick={() => {}}
              appearance='warning'
              asLink
            />
          </FormButtonGroup>
        </FormMain>
      </div>
    </FormWrapper>
  );
}

export default PointOfContact;
