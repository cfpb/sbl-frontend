// Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
/* eslint-disable prettier/prettier */
import InputErrorMessage from 'components/InputErrorMessage';
import FormParagraph from 'components/FormParagraph';
import { Dropdown } from 'design-system-react';
import type { GroupBase, Props } from 'react-select';

interface Step1FormDropdownContainerProperties {
  error: string;
}

function Step1FormDropdownContainer<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>,
>({
  error,
  onChange,
  ...properties
}: Props<OptionType, IsMulti, GroupType> &
  Step1FormDropdownContainerProperties): JSX.Element {
  return (
    <>
      <div>
        <FormParagraph>
          If the financial institution you are authorized to file for is not
          included above or if you are authorized to file for additional
          institutions, search by LEI and select your institution.
        </FormParagraph>
        <Dropdown
          error={error}
          // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
          onSelect={onChange}
          {...properties}
        />
      </div>
      {error ? (
        <div>
          <InputErrorMessage>{error}</InputErrorMessage>
        </div>
      ) : null}
    </>
  );
}

export default Step1FormDropdownContainer;
