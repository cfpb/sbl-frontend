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
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  for (const item of [name || lei, filingPeriod]) {
    if (item) {
      content.push(item);
    }
  }
  const contentUsed = content
    .filter(Boolean)
    .join(`${'\u00A0\u00A0'}|${'\u00A0\u00A0'}`);
  return <Heading type={headingType}>{contentUsed}</Heading>;
}
export default InstitutionHeading;
