import FieldGroup from 'components/FieldGroup';
import InputEntry from 'components/InputEntry';
import { InstitutionHelperText } from 'pages/Filing/formHelpers';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { ValidationSchemaCPF } from 'types/formTypes';
import { formDelimiter } from 'utils/common';
import { LeiInputCharLimit } from 'utils/constants';

interface AddFinancialInstitutionProperties {
  index: number;
  register: UseFormRegister<ValidationSchemaCPF>;
  formErrors: FieldErrors<ValidationSchemaCPF>;
  isLast?: boolean;
}

function AddFinancialInstitution({
  index,
  register,
  formErrors,
  isLast,
}: AddFinancialInstitutionProperties): JSX.Element {
  return (
    <div className={isLast ? '' : 'mb-[1.875rem]'} key={index}>
      <FieldGroup>
        <InputEntry
          label='Financial institution name'
          // See `getAllProperties.tsx` for field naming convention
          id={`financialInstitutions${formDelimiter}${index}${formDelimiter}name`}
          {...register(`financialInstitutions.${index}.name` as const)}
          errorMessage={
            formErrors.financialInstitutions?.[`${index}`]?.name?.message
          }
          showError
        />
        <InputEntry
          label='Legal Entity Identifier (LEI)'
          helperText={InstitutionHelperText.lei}
          // See `getAllProperties.tsx` for field naming convention
          id={`financialInstitutions${formDelimiter}${index}${formDelimiter}lei`}
          {...register(`financialInstitutions.${index}.lei` as const)}
          maxLength={LeiInputCharLimit}
          errorMessage={
            formErrors.financialInstitutions?.[`${index}`]?.lei?.message
          }
          showError
          isLast
        />
      </FieldGroup>
    </div>
  );
}

AddFinancialInstitution.defaultProps = {
  isLast: false,
};

export default AddFinancialInstitution;
