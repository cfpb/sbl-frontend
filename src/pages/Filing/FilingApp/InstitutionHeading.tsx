import { Heading } from 'design-system-react';
import type { InstitutionDataType } from './InstitutionCard.types';

// Format the Institution name + LEI
function InstitutionHeading({
  name,
  filingPeriod,
  eyebrow = false,
  // eslint-disable-next-line react/require-default-props
}: InstitutionDataType & { eyebrow?: boolean }): JSX.Element {
  const content: (number | string)[] = [];
  for (const item of [name, filingPeriod]) {
    if (item) {
      content.push(item);
    }
  }
  const contentUsed = content.filter(Boolean).join(`${'  '}|${'  '}`);
  return (
    <Heading className='whitespace-pre' type={eyebrow ? 'eyebrow' : '5'}>
      {contentUsed}
    </Heading>
  );
}
export default InstitutionHeading;
