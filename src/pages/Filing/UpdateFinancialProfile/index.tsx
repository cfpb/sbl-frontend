import { zodResolver } from '@hookform/resolvers/zod';
import FieldGroup from 'components/FieldGroup';
import FormWrapper from 'components/FormWrapper';
import SectionIntro from 'components/SectionIntro';
import { Button, TextIntroduction } from 'design-system-react';
import type { UFPSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { ufpSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import InputEntry from 'pages/ProfileForm/Step1Form/InputEntry';

import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

interface Properties {}

function UpdateFinancialProfile(properties: Properties) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    // trigger,
    getValues,
    formState: { errors: formErrors },
  } = useForm<UFPSchema>({
    resolver: zodResolver(ufpSchema),
    // defaultValues: {
    // },
  });

  const onSubmitButtonAction = () =>
    console.log('data to be submitted:', getValues());
  const clearForm = () => console.log('clicked');
  const onSubmit: SubmitHandler<UFPSchema> = data => {
    // TODO: decide if real-time input validation or on submit button click validation is better UX
    // console.log('data:', data);
  };

  // console.log(getValues());

  return (
    <FormWrapper>
      <div id='update-financial-profile'>
        <div className='mb-[3.75rem] mt-[2.84375rem] max-w-[41.875rem]'>
          <TextIntroduction
            heading='Update your financial institution profile'
            subheading='This profile reflects the most current data available to the CFPB for your financial institution. Most updates to your financial institution profile details must be handled at the source (GLEIF or NIC). For  all other update requests, fill out the form below.'
            description={
              <>
                Requested updates are processed by our support staff. Please
                allow 24-48 hours for a response during normal business hours.
              </>
            }
          />
        </div>

        <SectionIntro heading='Review your financial institution details'>
          To update the email domains for your financial institution, contact
          our support staff. To update any other data in this section, visit
          GLEIF.
        </SectionIntro>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              render={({ field }) => (
                <label htmlFor='checkboxes.option1'>
                  <input
                    type='checkbox'
                    {...field}
                    id='checkboxes.option1'
                    onChange={e =>
                      setValue('checkboxes.option1', e.target.checked)
                    }
                  />{' '}
                  option1
                </label>
                // <Checkbox
                //   id='option1'
                //   label='option1'
                //   {...field}
                //   onChange={e =>
                //     setValue('checkboxes.option1', e.target.checked)
                //   }
                // />
              )}
              control={control}
              name='checkboxes.option1'
              // rules={{ required: 'This field is required' }}
            />
          </FieldGroup>
          <SectionIntro heading=''>Break</SectionIntro>

          <FieldGroup>
            <InputEntry
              label='Federal Taxpayer Identification Number (TIN)'
              id='tin'
              {...register('tin')}
              errors={formErrors}
              showError={false}
            />
          </FieldGroup>
        </form>

        <div className='mt-[1.875rem]'>
          <Button
            appearance='primary'
            onClick={onSubmitButtonAction}
            label='Submit'
            aria-label='Submit User Profile'
            size='default'
            type='submit'
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
      </div>
    </FormWrapper>
  );
}

export default UpdateFinancialProfile;
