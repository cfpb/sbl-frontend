import { zodResolver } from '@hookform/resolvers/zod';
import submitUpdateFinancialProfile from 'api/requests/submitUpdateFinancialProfile';
import useSblAuth from 'api/useSblAuth';
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
import type {
  CheckboxOption,
  UFPSchema,
} from 'pages/Filing/UpdateFinancialProfile/types';
import {
  checkboxOptions,
  ufpSchema,
} from 'pages/Filing/UpdateFinancialProfile/types';
import InputEntry from 'pages/ProfileForm/Step1Form/InputEntry';

import { Controller as FormController, useForm } from 'react-hook-form';

// TODO: Decide on properties to inherit
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Properties {}

const defaultValues: UFPSchema = {
  tin: '',
  checkboxes: Object.fromEntries(
    checkboxOptions.map(option => [option.id, false]),
  ),
};

// TODO: Decide on properties to use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function UpdateFinancialProfile(properties: Properties): JSX.Element {
  const auth = useSblAuth();

  const {
    register,
    control,
    setValue,
    trigger,
    getValues,
    formState: { errors: formErrors },
  } = useForm<UFPSchema>({
    resolver: zodResolver(ufpSchema),
    defaultValues,
  });

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();
    // TODO: Will be used for debugging after clicking 'Submit'
    // eslint-disable-next-line no-console
    console.log('passes validation?', passesValidation);
    // if (passesValidation) {
    const preFormattedData = getValues();
    // TODO: Will be used for debugging after clicking 'Submit'
    // eslint-disable-next-line no-console
    console.log('data to be submitted (before format):', preFormattedData);
    // POST formData
    // TODO: Will be used for debugging after clicking 'Submit'
    // eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
    const response = await submitUpdateFinancialProfile(auth, preFormattedData);
    // }
  };

  // TODO: Clear all checkboxes and inputs -- use setValue(defaultValues)
  // eslint-disable-next-line no-console
  const onClearform = (): void => console.log('onClearform clicked');

  // TODO: Will be used for debugging errors after clicking 'Submit'
  // eslint-disable-next-line no-console
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

        <form>
          <FieldGroup>
            <List isUnstyled>
              {checkboxOptions.map((option: CheckboxOption): JSX.Element => {
                const onChange = (
                  event: React.ChangeEvent<HTMLInputElement>,
                ): void => {
                  setValue(`checkboxes.${option.id}`, event.target.checked);
                };
                return (
                  <ListItem key={option.id}>
                    <FormController
                      render={({ field }) => (
                        // @ts-expect-error TS error should be fixed in DSR Repo
                        <Checkbox
                          id={option.id}
                          label={option.label}
                          {...field}
                          onChange={onChange}
                          checked={Boolean(
                            getValues(`checkboxes.${option.id}`),
                          )}
                        />
                      )}
                      control={control}
                      name={`checkboxes.${option.id}`}
                      // TODO: Add special rules or remove this comment
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
              showError
            />
          </FieldGroup>
        </form>

        <FormButtonGroup>
          <Button
            appearance='primary'
            // TODO: Resolve this TypeScript Error
            // https://github.com/cfpb/sbl-frontend/issues/237
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={onSubmitButtonAction}
            label='Submit'
            aria-label='Submit User Profile'
            size='default'
            type='submit'
          />
          <Button
            className='ml-[0.9375rem] inline-block'
            label='Clear form'
            onClick={onClearform}
            appearance='warning'
            asLink
          />
        </FormButtonGroup>
      </div>
    </FormWrapper>
  );
}

export default UpdateFinancialProfile;
