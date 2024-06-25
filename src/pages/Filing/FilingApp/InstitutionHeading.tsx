import { Heading } from 'design-system-react';
import type { HeadingType } from 'design-system-react/dist/components/Headings/Heading';
import type { InstitutionDataType } from './InstitutionCard.types';

// Format the Institution name + LEI
function InstitutionHeading({
  name,
  lei,
  filingPeriod,
  headingType = '5',
  // eslint-disable-next-line react/require-default-props
}: InstitutionDataType & { headingType?: HeadingType }): JSX.Element {
  const content: (number | string)[] = [];
  for (const item of [name, lei, filingPeriod]) {
    if (item) {
      content.push(item);
    }
  }
  const contentUsed = content.filter(Boolean).join(`${'  '}|${'  '}`);
  return <Heading type={headingType}>{contentUsed}</Heading>;
}
export default InstitutionHeading;
