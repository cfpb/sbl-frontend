import FieldGroup from 'components/FieldGroup';
import InputEntry from 'components/InputEntry';
import { Checkbox, Heading, List, ListItem } from 'design-system-react';
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { Controller as FormController } from 'react-hook-form';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import type { CheckboxOption, UpdateInstitutionType } from './types';
import { checkboxOptions } from './types';

const SLB_INSTITUTION_TYPE_OTHER = '13';
const OTHER_ID = `sbl_institution_types.${SLB_INSTITUTION_TYPE_OTHER}`;

interface TypesFinancialInstitutionSectionProperties {
  register: UseFormRegister<UpdateInstitutionType>;
  setValue: UseFormSetValue<UpdateInstitutionType>;
  formErrors: FieldErrors<UpdateInstitutionType>;
  control: Control<UpdateInstitutionType>;
  data: InstitutionDetailsApiType;
}

function TypesFinancialInstitutionSection({
  data,
  register,
  setValue,
  formErrors,
  control,
}: TypesFinancialInstitutionSectionProperties): JSX.Element {
  const typeOtherData = data.sbl_institution_types.find(item => {
    return item.sbl_type.id === SLB_INSTITUTION_TYPE_OTHER;
  });

  return (
    <FieldGroup>
      <Heading type='4' id='sbl_institution_types'>
        Type(s) of financial institution
      </Heading>
      <List isUnstyled>
        {checkboxOptions.map((option: CheckboxOption): JSX.Element => {
          const optionId = `sbl_institution_types.${option.id}`;

          const onCheckboxChange = (
            event: React.ChangeEvent<HTMLInputElement>,
          ): void => {
            setValue(optionId, event.target.checked);

            // Clear `Other` text box
            if (optionId === OTHER_ID && !event.target.checked) {
              setValue('sbl_institution_types_other', '');
            }
          };

          return (
            <ListItem key={option.id}>
              <FormController
                render={({ field }) => {
                  return (
                    <Checkbox
                      id={option.id}
                      label={option.label}
                      checked={Boolean(field.value)}
                      onChange={onCheckboxChange}
                    />
                  );
                }}
                control={control}
                name={optionId}
              />
            </ListItem>
          );
        })}
      </List>
      <InputEntry
        label=''
        id='institutionTypeOther'
        {...register('sbl_institution_types_other', {
          value: typeOtherData?.details,
        })}
        errorMessage={formErrors.sbl_institution_types_other?.message}
        showError
      />
    </FieldGroup>
  );
}

export default TypesFinancialInstitutionSection;
