// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Zod Infer issue
import { zodResolver } from '@hookform/resolvers/zod';
import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FieldGroup from 'components/FieldGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import InputEntry from 'components/InputEntry';
import { Link } from 'components/Link';
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
                    errors={formErrors}
                    isDisabled={false}
                  />
                  <InputEntry
                    label='Legal Entity Identifier (LEI)'
                    id={`financialInstitutions.${index}.lei`}
                    {...register(`financialInstitutions.${index}.lei` as const)}
                    errors={formErrors}
                    isDisabled={false}
                  />
                  <InputEntry
                    label='Research, Statistics, Supervision, Discount (RSSD) ID'
                    id={`financialInstitutions.${index}.rssd_id`}
                    {...register(
                      `financialInstitutions.${index}.rssd_id` as const,
                    )}
                    errors={formErrors}
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
