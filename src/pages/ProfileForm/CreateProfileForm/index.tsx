// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Zod Infer issue
import { zodResolver } from '@hookform/resolvers/zod';

import { submitUserProfileFi } from 'api/requests';

import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FormErrorHeader from 'components/FormErrorHeader';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';

import FormButtonGroup from 'components/FormButtonGroup';
import LinkButton from 'components/LinkButton';
import SectionIntro from 'components/SectionIntro';
import { Button, Link } from 'design-system-react';
import {
  emptyAddFinancialInstitution,
  scrollToElement,
} from 'pages/ProfileForm/ProfileFormUtils';
import Step1FormHeader from 'pages/ProfileForm/Step1Form/Step1FormHeader';
import Step1FormInfoHeader from 'pages/ProfileForm/Step1Form/Step1FormInfoHeader';
import type { ValidationSchemaCPF } from 'pages/ProfileForm/types';
import { validationSchemaCPF } from 'pages/ProfileForm/types';
import { useFieldArray, useForm } from 'react-hook-form';
import Step1FormInfoFieldGroup from '../Step1Form/Step1FormInfoFieldGroup';
import AddFinancialInstitution from './AddFinancialInstitution';

import { scenarios } from 'pages/Summary/Summary.data';
import { useNavigate } from 'react-router-dom';

function CreateProfileForm(): JSX.Element {
  const navigate = useNavigate();
  const { emailAddress } = useSblAuth();
  const auth = useSblAuth();
  const formErrorHeaderId = 'CreateProfileFormErrors';
  const defaultValues: ValidationSchemaCPF = {
    firstName: '',
    lastName: '',
    email: emailAddress ?? '',
    financialInstitutions: [emptyAddFinancialInstitution],
  };

  const {
    register,
    control,
    reset,
    trigger,
    getValues,
    formState: { errors: formErrors },
  } = useForm<ValidationSchemaCPF>({
    resolver: zodResolver(validationSchemaCPF),
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
    if (passesValidation) {
      const preFormattedData = getValues();
      // POST formData
      // TODO: Will be used for debugging after clicking 'Submit'
      // eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
      const response = await submitUserProfileFi(
        auth,
        preFormattedData,
        `${preFormattedData.firstName} ${preFormattedData.lastName}`,
      );
      navigate('/summary', { state: { scenario: scenarios.Warning4 } });
    } else {
      scrollToElement(formErrorHeaderId);
    }
  };

  const onClearform = (): void => {
    reset();
    scrollToElement('firstName');
  };

  return (
    <FormWrapper>
      <div id='update-financial-profile'>
        <FormHeaderWrapper>
          <CrumbTrail>
            <Link href='/'>Platform home</Link>
          </CrumbTrail>
          <Step1FormHeader crumbTrailMarginTop />
        </FormHeaderWrapper>
        <Step1FormInfoHeader />
        <FormErrorHeader errors={formErrors} id={formErrorHeaderId} />
        <Step1FormInfoFieldGroup formErrors={formErrors} register={register} />
        <SectionIntro heading='Provide your financial institution details'>
          Provide the name, LEI, and RSSD ID of the financial institution for
          which you are authorized to file. If you have an RSSD ID, you must
          provide it. If you are authorized to file for an additional financial
          institution, click “Add a financial institution”.
        </SectionIntro>
        {fields.map((field, index) => {
          const onRemoveThisInstitution = (): void => remove(index);
          return (
            <div className='flex flex-col' key={`${field.id}`}>
              {index !== 0 && (
                <LinkButton
                  className='ml-auto'
                  icon='minus'
                  onClick={onRemoveThisInstitution}
                >
                  Remove this financial institution
                </LinkButton>
              )}
              <AddFinancialInstitution
                index={index}
                register={register}
                formErrors={formErrors}
              />
            </div>
          );
        })}
        <div className='mb-[3.75rem]'>
          <LinkButton onClick={onAppendFinancialInstitutions} icon='plus'>
            Add a financial institution
          </LinkButton>
        </div>
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

export default CreateProfileForm;
