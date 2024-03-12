import FieldGroup from 'components/FieldGroup';
import InputEntry from 'components/InputEntry';
import { Checkbox, Heading, List, ListItem } from 'design-system-react';
import { Controller as FormController } from 'react-hook-form';
import { Zero } from 'utils/constants';
import type { CheckboxOption } from './types';
import { checkboxOptions } from './types';

interface TypesFinancialInstitutionSectionProperties {
  register: any;
  setValue: any;
  formErrors: any;
  control: any;
}

function TypesFinancialInstitutionSection({
  register,
  setValue,
  formErrors,
  control,
}: TypesFinancialInstitutionSectionProperties): JSX.Element {
  return (
    <FieldGroup>
      <Heading type='4'>Types of financial institution</Heading>
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
        {...register('sbl_institution_types_other')}
        errorMessage={formErrors[Zero]}
        showError
      />
    </FieldGroup>
  );
}

export default TypesFinancialInstitutionSection;
