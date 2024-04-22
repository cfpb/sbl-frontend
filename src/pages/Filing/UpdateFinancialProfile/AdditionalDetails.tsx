/* eslint-disable react/require-default-props */
import { FormSectionWrapper } from 'components/FormSectionWrapper';
import LabelOptional from 'components/LabelOptional';
import SectionIntro from 'components/SectionIntro';
import { Label, WellContainer } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { UpdateInstitutionType } from 'pages/Filing/UpdateFinancialProfile/types';
import type { UseFormRegister } from 'react-hook-form';
import type { ValidationSchemaCPF } from 'types/formTypes';

function AdditionalDetails({
  register,
  isOptional = false,
}: {
  register: UseFormRegister<UpdateInstitutionType | ValidationSchemaCPF>;
  isOptional?: boolean;
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
          Additional details{isOptional ? <LabelOptional /> : null}
        </Label>
        {/* 
          TODO: Fix DSR TextArea (remove forwardRef?) and use here 
          https://github.com/cfpb/design-system-react/issues/331
        */}
        <textarea
          id='additional_details'
          className='a-text-input box-border w-full'
          placeholder=''
          {...register('additional_details')}
          rows={4}
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

export default AdditionalDetails;
