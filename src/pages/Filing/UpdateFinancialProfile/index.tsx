import { zodResolver } from '@hookform/resolvers/zod';
import FieldGroup from 'components/FieldGroup';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import SectionIntro from 'components/SectionIntro';
import {
  Button,
  Checkbox,
  List,
  ListItem,
  TextIntroduction,
} from 'design-system-react';
import type { UFPSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import {
  checkboxOptions,
  ufpSchema,
} from 'pages/Filing/UpdateFinancialProfile/types';
import InputEntry from 'pages/ProfileForm/Step1Form/InputEntry';

import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

interface Properties {}

const defaultValues: UFPSchema = {
  tin: '',
  checkboxes: Object.fromEntries(
    checkboxOptions.map(option => [option, false]),
  ),
};

function UpdateFinancialProfile(properties: Properties): JSX.Element {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors: formErrors },
  } = useForm<UFPSchema>({
    resolver: zodResolver(ufpSchema),
    defaultValues,
  });

  const onSubmitButtonAction = async () => {
    const passesValidation = await trigger();
    console.log('passes validation?', passesValidation);
    console.log('data to be submitted:', getValues());
  };
  const clearForm = () => console.log('clicked');
  const onSubmit: SubmitHandler<UFPSchema> = data => {
    // TODO: decide if real-time input validation or on submit button click validation is better UX
    // console.log('data:', data);
  };

  console.log('formErrors:', formErrors);

  return (
    <FormWrapper>
      <div id='update-financial-profile'>
        <FormHeaderWrapper>
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
        </FormHeaderWrapper>
        <SectionIntro heading='Review your financial institution details'>
          To update the email domains for your financial institution, contact
          our support staff. To update any other data in this section, visit
          GLEIF.
        </SectionIntro>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <List isUnstyled>
              {checkboxOptions.map((option: string): JSX.Element => {
                const onChange = (
                  event: React.ChangeEvent<HTMLInputElement>,
                ): void => {
                  setValue(`checkboxes.${option}`, event.target.checked);
                };
                return (
                  <ListItem key={option}>
                    <Controller
                      render={({ field }) => (
                        <Checkbox
                          id={option}
                          label={option}
                          {...field}
                          onChange={onChange}
                          checked={getValues(`checkboxes.${option}`)}
                        />
                      )}
                      control={control}
                      name={`checkboxes.${option}`}
                      // rules={{ required: 'This field is required' }}
                    />
                  </ListItem>
                );
              })}
            </List>
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

        <FormButtonGroup>
          <Button
            appearance='primary'
            onClick={onSubmitButtonAction}
            label='Submit'
            aria-label='Submit User Profile'
            size='default'
            type='submit'
          />
          <Button
            className='ml-[0.9375rem] inline-block'
            label='Clear form'
            onClick={clearForm}
            appearance='warning'
            asLink
          />
        </FormButtonGroup>
      </div>
    </FormWrapper>
  );
}

export default UpdateFinancialProfile;
