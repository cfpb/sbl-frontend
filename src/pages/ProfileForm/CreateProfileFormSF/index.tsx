// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Zod Infer issue
import { zodResolver } from '@hookform/resolvers/zod';
import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FieldGroup from 'components/FieldGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import InputEntry from 'components/InputEntry';
import { Heading } from 'design-system-react';

import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import Step1FormHeader from 'pages/ProfileForm/Step1Form/Step1FormHeader';
import Step1FormInfoHeader from 'pages/ProfileForm/Step1Form/Step1FormInfoHeader';
import type { ValidationSchemaSF } from 'pages/ProfileForm/types';
import { validationSchemaSF } from 'pages/ProfileForm/types';
import { useFieldArray, useForm } from 'react-hook-form';
import Step1FormInfoFieldGroup from '../Step1Form/Step1FormInfoFieldGroup';

function CreateProfileFormSF(): JSX.Element {
  const { emailAddress } = useSblAuth();
  const defaultValues: ValidationSchemaSF = {
    firstName: '',
    lastName: '',
    email: emailAddress ?? '',
    financialInstitutions: [
      {
        name: '',
        lei: '',
        rssd_id: '',
      },
    ],
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
              <div className='mb-[3.75rem]' key={`${field.id}`}>
                <FieldGroup>
                  <InputEntry
                    label='Financial institution name'
                    id={`financialInstitutions.${index}.name`}
                    {...register(
                      `financialInstitutions.${index}.name` as const,
                    )}
                    error={formErrors.financialInstitutions?.[`${index}`].name}
                    isDisabled={false}
                  />
                  <InputEntry
                    label='Legal Entity Identifier (LEI)'
                    id={`financialInstitutions.${index}.lei`}
                    {...register(`financialInstitutions.${index}.lei` as const)}
                    error={formErrors.financialInstitutions?.[`${index}`].lei}
                    isDisabled={false}
                  />
                  <InputEntry
                    label={
                      <Heading type='4' className='mb-[0.625rem]'>
                        Research, Statistics, Supervision, Discount (RSSD) ID{' '}
                        <span className='text-[#919395]'>(optional)</span>
                      </Heading>
                    }
                    id={`financialInstitutions.${index}.rssd_id`}
                    {...register(
                      `financialInstitutions.${index}.rssd_id` as const,
                    )}
                    error={
                      formErrors.financialInstitutions?.[`${index}`].rssd_id
                    }
                    isDisabled={false}
                  />
                </FieldGroup>
              </div>
            );
          })}
        </FormHeaderWrapper>
      </div>
    </FormWrapper>
  );
}

export default CreateProfileFormSF;
