// TODO: vv Revisit these exceptions vv
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import LabelOptional from 'components/LabelOptional';
import SectionIntro from 'components/SectionIntro';
import { Label, TextArea, WellContainer } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import { SectionWrapper } from './UpdateIdentifyingInformation';

function AdditionalDetails({ register }: { register: any }): JSXElement {
  return (
    <SectionWrapper>
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
        <TextArea
          id='additional_details'
          isFullWidth
          {...register('additional_details')}
          rows='5'
        />
      </WellContainer>
    </SectionWrapper>
  );
}

export default AdditionalDetails;
