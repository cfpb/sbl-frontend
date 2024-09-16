import FieldGroup from 'components/FieldGroup';
import InputEntry from 'components/InputEntry';
import {
  Checkbox,
  Heading,
  Icon,
  List,
  ListItem,
  Paragraph,
} from 'design-system-react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { SLB_INSTITUTION_TYPE_OTHER } from 'utils/constants';
import type { CheckboxOption, UpdateTypeOfInstitutionType } from './types';
import { checkboxOptions } from './types';

const OTHER_ID = `sbl_institution_types.${SLB_INSTITUTION_TYPE_OTHER}`;

interface TypesFinancialInstitutionSectionProperties {
  register: UseFormRegister<UpdateTypeOfInstitutionType>;
  setValue: UseFormSetValue<UpdateTypeOfInstitutionType>;
  watch: UseFormWatch<UpdateTypeOfInstitutionType>;
  formErrors: FieldErrors<UpdateTypeOfInstitutionType>;
  data: InstitutionDetailsApiType;
}

function TypesFinancialInstitutionSection({
  data,
  register,
  setValue,
  formErrors,
  watch,
}: TypesFinancialInstitutionSectionProperties): JSX.Element {
  const typeOtherData = data.sbl_institution_types.find(item => {
    return item.sbl_type.id === SLB_INSTITUTION_TYPE_OTHER;
  });

  const checkboxValues = watch('sbl_institution_types');
  const isOtherChecked = checkboxValues[SLB_INSTITUTION_TYPE_OTHER];

  const sectionError = formErrors.sbl_institution_types;

  return (
    <FieldGroup>
      <Heading type='4' id='sbl_institution_types'>
        Type of financial institution
      </Heading>
      <div className='my-[0.9375rem] max-w-[41.875rem] text-grayDark'>
        Select all applicable types of financial institutions from the list
        below.
      </div>
      {sectionError ? (
        <Paragraph>
          <Icon
            ariaLabel='Error'
            name='error'
            withBg
            // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
            className='text-errorColor'
          />{' '}
          {sectionError.message}
        </Paragraph>
      ) : null}
      <List isUnstyled className='mb-0 mt-0'>
        {checkboxOptions.map((option: CheckboxOption): JSX.Element => {
          const optionId = `sbl_institution_types.${option.id}`;

          const onCheckboxChange = (
            event: React.ChangeEvent<HTMLInputElement>,
          ): void => {
            // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
            setValue(optionId, event.target.checked);

            // Clear `Other` text box
            if (optionId === OTHER_ID && !event.target.checked) {
              setValue('sbl_institution_types_other', '');
            }
          };

          return (
            <ListItem key={option.id}>
              <Checkbox
                id={option.id}
                label={option.label}
                checked={Boolean(checkboxValues[Number(option.id)])}
                onChange={onCheckboxChange}
              />
            </ListItem>
          );
        })}
      </List>
      <InputEntry
        label=''
        id='institutionTypeOther'
        disabled={!isOtherChecked}
        {...register('sbl_institution_types_other', {
          value: typeOtherData?.details,
        })}
        helperText='You must enter a type of financial institution in the text field when “Other” is selected. Separate multiple entries with a comma and a space.'
        errorMessage={formErrors.sbl_institution_types_other?.message}
        showError
        isLast
      />
    </FieldGroup>
  );
}

export default TypesFinancialInstitutionSection;
