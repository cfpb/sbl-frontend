// TODO: vv Revisit these exceptions vv
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
        <Label htmlFor='stuff'>
          Additional details{' '}
          <span style={{ color: '#43484E' }}>(optional)</span>
        </Label>
        <TextArea
          id='stuff'
          isFullWidth
          {...register('additional_details')}
          placeholder=''
        />
      </WellContainer>
    </SectionWrapper>
  );
}

export default AdditionalDetails;
