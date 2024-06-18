import { Heading } from 'design-system-react';
import type { InstitutionDataType } from './InstitutionCard.types';

// Format the Institution name + LEI
function InstitutionHeading({
  name,
  lei,
  filingPeriod,
  eyebrow = false,
  // eslint-disable-next-line react/require-default-props
}: InstitutionDataType & { eyebrow?: boolean }): JSX.Element {
  const content: (number | string)[] = [];
  for (const item of [name, lei, filingPeriod, name, lei, filingPeriod]) {
    if (item) {
      content.push(item);
    }
  }
  const contentUsed = content.filter(Boolean).join(`${'  '}|${'  '}`);
  return <Heading type={eyebrow ? 'eyebrow' : '5'}>{contentUsed}</Heading>;
}
export default InstitutionHeading;
