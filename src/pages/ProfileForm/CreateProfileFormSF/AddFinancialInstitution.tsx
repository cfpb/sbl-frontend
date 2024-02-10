import FieldGroup from 'components/FieldGroup';
import InputEntry from 'components/InputEntry';
import { Heading } from 'design-system-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { ValidationSchemaSF } from '../types';

interface AddFinancialInstitutionProperties {
  index: number;
  register: UseFormRegister<ValidationSchemaSF>;
  formErrors: FieldErrors<ValidationSchemaSF>;
}

function AddFinancialInstitution({
  index,
  register,
  formErrors,
}: AddFinancialInstitutionProperties): JSX.Element {
  console.log('formErrors in add:', formErrors);
  return (
    <div className='mb-[2.01875rem]' key={index}>
      <FieldGroup>
        <InputEntry
          label='Financial institution name'
          id={`financialInstitutions.${index}.name`}
          {...register(`financialInstitutions.${index}.name` as const)}
          error={formErrors.financialInstitutions?.[`${index}`]?.name}
          isDisabled={false}
        />
        <InputEntry
          label='Legal Entity Identifier (LEI)'
          id={`financialInstitutions.${index}.lei`}
          {...register(`financialInstitutions.${index}.lei` as const)}
          error={formErrors.financialInstitutions?.[`${index}`]?.lei}
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
          {...register(`financialInstitutions.${index}.rssd_id` as const)}
          error={formErrors.financialInstitutions?.[`${index}`]?.rssd_id}
          isDisabled={false}
        />
      </FieldGroup>
    </div>
  );
}

export default AddFinancialInstitution;
