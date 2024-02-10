/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Zod Infer issue
import { zodResolver } from '@hookform/resolvers/zod';
import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';

import FormButtonGroup from 'components/FormButtonGroup';
import SectionIntro from 'components/SectionIntro';
import { Button, Icon, Link, LinkText } from 'design-system-react';
import { emptyAddFinancialInstitution } from 'pages/ProfileForm/ProfileFormUtils';
import Step1FormHeader from 'pages/ProfileForm/Step1Form/Step1FormHeader';
import Step1FormInfoHeader from 'pages/ProfileForm/Step1Form/Step1FormInfoHeader';
import type { ValidationSchemaSF } from 'pages/ProfileForm/types';
import { validationSchemaSF } from 'pages/ProfileForm/types';
import { useFieldArray, useForm } from 'react-hook-form';
import Step1FormInfoFieldGroup from '../Step1Form/Step1FormInfoFieldGroup';
import AddFinancialInstitution from './AddFinancialInstitution';

function CreateProfileFormSF(): JSX.Element {
  const { emailAddress } = useSblAuth();
  const defaultValues: ValidationSchemaSF = {
    firstName: '',
    lastName: '',
    email: emailAddress ?? '',
    financialInstitutions: [emptyAddFinancialInstitution],
  };

  const {
    register,
    control,
    // setValue,
    trigger,
    getValues,
    formState: { errors: formErrors },
  } = useForm<ValidationSchemaSF>({
    resolver: zodResolver(validationSchemaSF),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'financialInstitutions',
    control,
  });

  const onAppendFinancialInstitutions = (): void =>
    append(emptyAddFinancialInstitution);

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();
    console.log('passes validation?', passesValidation);
    if (passesValidation) {
      const preFormattedData = getValues();
      console.log('data to be submitted (before format):', preFormattedData);
      // POST formData
      // TODO: Will be used for debugging after clicking 'Submit'
      // eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
      // const response = await submitUpdateFinancialProfile(
      //   auth,
      //   preFormattedData,
      // );
    }
    // else {
    //   scrollToErrorForm(formErrorHeaderId);
    // }
  };

  const onClearform = (): void => console.log('clicked onClearform');

  console.log('formErrors:', formErrors);

  return (
    <FormWrapper>
      <div id='update-financial-profile'>
        <FormHeaderWrapper>
          <CrumbTrail>
            <Link href='/'>Platform home</Link>
          </CrumbTrail>
          <Step1FormHeader crumbTrailMarginTop />
          <Step1FormInfoHeader />
          <Step1FormInfoFieldGroup
            formErrors={formErrors}
            register={register}
          />
          <SectionIntro heading='Provide your financial institution details'>
            Provide the name, LEI, and RSSD ID of the financial institution for
            which you are authorized to file. If you have an RSSD ID, you must
            provide it. If you are authorized to file for an additional
            financial institution, click “Add a financial institution”.
          </SectionIntro>
          {fields.map((field, index) => {
            const onRemoveThisInstitution = (): void => remove(index);
            return (
              <div className='flex flex-col' key={`${field.id}`}>
                <Link
                  className='ml-auto'
                  onClick={onRemoveThisInstitution}
                  isJumpLeft
                >
                  <Icon name='minus' />
                  <LinkText className='ml-2'>
                    Remove this financial institution
                  </LinkText>
                </Link>
                <AddFinancialInstitution
                  index={index}
                  register={register}
                  formErrors={formErrors}
                />
              </div>
            );
          })}
          <Link onClick={onAppendFinancialInstitutions} isJumpLeft>
            <Icon name='plus' />
            <LinkText className='ml-2'>Add a financial institution</LinkText>
          </Link>

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
        </FormHeaderWrapper>
      </div>
    </FormWrapper>
  );
}

export default CreateProfileFormSF;
