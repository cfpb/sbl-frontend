import FieldGroup from 'components/FieldGroup';
import InputEntry from 'components/InputEntry';
import { Heading } from 'design-system-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { formDelimiter } from 'utils/common';
import type { ValidationSchemaCPF } from '../types';

interface AddFinancialInstitutionProperties {
  index: number;
  register: UseFormRegister<ValidationSchemaCPF>;
  formErrors: FieldErrors<ValidationSchemaCPF>;
}

function AddFinancialInstitution({
  index,
  register,
  formErrors,
}: AddFinancialInstitutionProperties): JSX.Element {
  return (
    <div className='mb-[2.01875rem]' key={index}>
      <FieldGroup>
        <InputEntry
          label='Financial institution name'
          // See `getAllProperties.tsx` for field naming convention
          id={`financialInstitutions${formDelimiter}${index}${formDelimiter}name`}
          {...register(`financialInstitutions.${index}.name` as const)}
          errorMessage={
            formErrors.financialInstitutions?.[`${index}`]?.name?.message
          }
          isDisabled={false}
        />
        <InputEntry
          label='Legal Entity Identifier (LEI)'
          // See `getAllProperties.tsx` for field naming convention
          id={`financialInstitutions${formDelimiter}${index}${formDelimiter}lei`}
          {...register(`financialInstitutions.${index}.lei` as const)}
          errorMessage={
            formErrors.financialInstitutions?.[`${index}`]?.lei?.message
          }
          isDisabled={false}
        />
        <InputEntry
          label={
            <Heading type='4' className='mb-[0.625rem]'>
              Research, Statistics, Supervision, Discount (RSSD) ID{' '}
              <span className='text-[#919395]'>(optional)</span>
            </Heading>
          }
          // See `getAllProperties.tsx` for field naming convention
          id={`financialInstitutions${formDelimiter}${index}${formDelimiter}rssd_id`}
          {...register(`financialInstitutions.${index}.rssd_id` as const)}
          errorMessage={
            formErrors.financialInstitutions?.[`${index}`]?.rssd_id?.message
          }
          isDisabled={false}
          isLast
        />
      </FieldGroup>
    </div>
  );
}

export default AddFinancialInstitution;
