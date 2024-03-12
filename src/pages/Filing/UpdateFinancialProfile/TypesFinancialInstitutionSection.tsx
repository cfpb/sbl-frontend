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
import { Zero } from 'utils/constants';
import type { CheckboxOption, UFPSchema } from './types';
import { checkboxOptions, sblInstitutionTypeMap } from './types';

interface TypesFinancialInstitutionSectionProperties {
  register: UseFormRegister<UFPSchema>;
  setValue: UseFormSetValue<UFPSchema>;
  formErrors: FieldErrors<UFPSchema>;
  control: Control<UFPSchema>;
}

function TypesFinancialInstitutionSection({
  register,
  setValue,
  formErrors,
  control,
}: TypesFinancialInstitutionSectionProperties): JSX.Element {
  const typeOtherData = data.sbl_institution_types.find(item => {
    return item.sbl_type.id === sblInstitutionTypeMap.other;
  });
  return (
    <FieldGroup>
      <Heading type='4'>Type(s) of financial institution</Heading>
      <List isUnstyled>
        {checkboxOptions.map((option: CheckboxOption): JSX.Element => {
          const optionId = `sbl_institution_types.${option.id}`;

          const onCheckboxChange = (
            event: React.ChangeEvent<HTMLInputElement>,
          ): void => {
            setValue(optionId, event.target.checked);
          };

          return (
            <ListItem key={option.id}>
              <FormController
                render={({ field }) => {
                  return (
                    <Checkbox
                      id={option.id}
                      label={option.label}
                      {...register(optionId)}
                      checked={field.value}
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
        errorMessage={formErrors[Zero]}
        showError
      />
    </FieldGroup>
  );
}

export default TypesFinancialInstitutionSection;
