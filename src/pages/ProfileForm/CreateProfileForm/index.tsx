// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Zod Infer issue
import { zodResolver } from '@hookform/resolvers/zod';

import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FormErrorHeader from 'components/FormErrorHeader';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';

import FormButtonGroup from 'components/FormButtonGroup';
import FormMain from 'components/FormMain';
import { Link } from 'components/Link';
import LinkButton from 'components/LinkButton';
import SectionIntro from 'components/SectionIntro';
import { Button } from 'design-system-react';
import {
  emptyAddFinancialInstitution,
  formatUserProfileObject,
  scrollToElement,
} from 'pages/ProfileForm/ProfileFormUtils';

import type { CupNFFormHeaderErrorsType } from 'components/FormErrorHeader.data';
import { CupNFFormHeaderErrors } from 'components/FormErrorHeader.data';
import Step1FormHeader from 'pages/ProfileForm/Step1Form/Step1FormHeader';
import Step1FormInfoHeader from 'pages/ProfileForm/Step1Form/Step1FormInfoHeader';
import { useFieldArray, useForm } from 'react-hook-form';
import type { ValidationSchemaCPF } from 'types/formTypes';
import { validationSchemaCPF } from 'types/formTypes';
import Step1FormInfoFieldGroup from '../Step1Form/Step1FormInfoFieldGroup';
import AddFinancialInstitution from './AddFinancialInstitution';

import { scenarios } from 'pages/Summary/Summary.data';

import { useNavigate } from 'react-router-dom';

import { sblHelpMail } from 'utils/common';
import { One } from 'utils/constants';
import { normalKeyLogic } from 'utils/getFormErrorKeyLogic';

import useSubmitUserProfile from 'utils/useSubmitUserProfile';
import useSubmitUserProfileFi from 'utils/useSubmitUserProfileFi';

function CreateProfileForm(): JSX.Element {
  const navigate = useNavigate();
  const { emailAddress } = useSblAuth();
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

  // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onAppendFinancialInstitutions = (): void =>
    append(emptyAddFinancialInstitution);

  const { mutateAsync: mutateSubmitUserProfile } = useSubmitUserProfile();
  const { mutateAsync: mutateSubmitUserProfileFi } = useSubmitUserProfileFi();

  const onSubmitButtonAction = async (): void => {
    const passesValidation = await trigger();
    if (passesValidation) {
      try {
        const preFormattedData = getValues();
        // 1.) Sending First Name and Last Name to the backend
        const formattedUserProfileObject = formatUserProfileObject(
          {
            firstName: preFormattedData.firstName,
            lastName: preFormattedData.lastName,
          },
          false,
        );
        await mutateSubmitUserProfile({
          userProfileObject: formattedUserProfileObject,
        });
        // 2.) Sending the financial institutions list to the mail api
        await mutateSubmitUserProfileFi({ formFieldsObject: preFormattedData });
        navigate('/profile/complete/summary/submitted', {
          state: { scenario: scenarios.Warning4 },
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      scrollToElement(formErrorHeaderId);
    }
  };

  const onClearform = (): void => {
    reset();
    scrollToElement('firstName');
  };

  return (
    <div id='create-profile-form-no-associations'>
      <CrumbTrail>
        <Link href='/landing'>Home</Link>
      </CrumbTrail>
      <FormWrapper isMarginTop={false}>
        <FormHeaderWrapper>
          <Step1FormHeader isStep1={false} />
        </FormHeaderWrapper>
        <FormErrorHeader<ValidationSchemaCPF, CupNFFormHeaderErrorsType>
          errors={formErrors}
          id={formErrorHeaderId}
          formErrorHeaderObject={CupNFFormHeaderErrors}
          keyLogicFunc={normalKeyLogic}
          // showKeyIndexNumber -- re-enable post-mvp
        />
        <Step1FormInfoHeader />
        <FormMain>
          <Step1FormInfoFieldGroup
            formErrors={formErrors}
            register={register}
          />
          <SectionIntro heading='Provide your financial institution details'>
            Provide the name and LEI of the financial institution for which you
            are authorized to file. If you are authorized to file for an
            additional financial institution,{' '}
            <Link href={sblHelpMail}>email our support staff</Link>.
          </SectionIntro>
          {fields.map((field, index) => {
            const onRemoveThisInstitution = (): void => remove(index);
            const isLast = fields.length - One === index;
            return (
              <div className='flex flex-col' key={`${field.id}`}>
                {index !== 0 && (
                  <div className='ml-auto pb-[0.9375rem]'>
                    <LinkButton icon='minus' onClick={onRemoveThisInstitution}>
                      Remove this financial institution
                    </LinkButton>
                  </div>
                )}
                <AddFinancialInstitution
                  index={index}
                  register={register}
                  formErrors={formErrors}
                  isLast={isLast}
                />
              </div>
            );
          })}
          {/* TODO: Re-enable button post-mvp */}
          {/* https://github.com/cfpb/sbl-frontend/issues/596 */}
          {/* <div className='mb-[3.75rem]'>
            <LinkButton onClick={onAppendFinancialInstitutions} icon='plus'>
              Add an additional financial institution
            </LinkButton>
          </div> */}
          <FormButtonGroup>
            <Button
              appearance='primary'
              onClick={onSubmitButtonAction}
              label='Submit'
              aria-label='Submit User Profile'
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

export default CreateProfileForm;
