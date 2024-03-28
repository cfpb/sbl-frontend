// TODO: vv Revisit these exceptions vv
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FormSectionWrapper } from 'components/FormSectionWrapper';
import LabelOptional from 'components/LabelOptional';
import SectionIntro from 'components/SectionIntro';
import { Label, TextArea, WellContainer } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { UseFormRegister } from 'react-hook-form';
import type {
  InstitutionDetailsApiType,
  ValidationSchemaCPF,
} from 'types/formTypes';

function AdditionalDetails({
  register,
}: {
  register: UseFormRegister<InstitutionDetailsApiType | ValidationSchemaCPF>;
}): JSXElement {
  return (
    <FormSectionWrapper>
      <SectionIntro heading='Provide any additional details'>
        Do not include personal identifiable information (PII) or other
        sensitive information in the field below, such as your personal address,
        Social Security number, or passwords.
      </SectionIntro>
      <WellContainer className='u-mt30'>
        <Label htmlFor='additional_details'>
          Additional details
          <LabelOptional />
        </Label>
        {/* TODO: Fix TextArea's TypeScript errors (in DSR) */}
        <TextArea
          id='additional_details'
          isFullWidth
          placeholder=''
          {...register('additional_details')}
          rows={5}
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

export default AdditionalDetails;
