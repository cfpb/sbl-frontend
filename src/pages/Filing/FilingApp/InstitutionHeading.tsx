import type { InstitutionDataType } from './InstitutionCard.types';

// Format the Institution name + LEI
function InstitutionHeading({
  name,
  lei,
  filingPeriod,
}: InstitutionDataType): JSX.Element {
  const content: (number | string)[] = [];
  for (const item of [name, lei, filingPeriod]) {
    if (item) {
      content.push(item);
    }
  }
  const contentUsed = content.filter(Boolean).join(' | ');
}
export default InstitutionHeading;
