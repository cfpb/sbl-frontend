// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Zod Infer issue
import { zodResolver } from '@hookform/resolvers/zod';
import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';

import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
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

  window.trigger = trigger;

  console.log('formErrors:', formErrors);

  const { fields, append, remove } = useFieldArray({
    name: 'financialInstitutions',
    control,
  });

  window.append = (): void => append(emptyAddFinancialInstitution);

  console.log('getValues():', getValues());
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
            return (
              <AddFinancialInstitution
                key={`${field.id}`}
                index={index}
                register={register}
                formErrors={formErrors}
              />
            );
          })}
        </FormHeaderWrapper>
      </div>
    </FormWrapper>
  );
}

export default CreateProfileFormSF;
