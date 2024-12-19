import { Heading } from 'design-system-react';
import type { HeadingType } from 'design-system-react/dist/components/Headings/Heading';
import { formatPipeSeparatedString } from '../../../utils/formatting';
import type { InstitutionDataType } from './InstitutionCard.types';

// Format the Institution name + LEI
function InstitutionHeading({
  name,
  lei,
  filingPeriod,
  headingType = '5',
  // eslint-disable-next-line react/require-default-props
}: InstitutionDataType & { headingType?: HeadingType }): JSX.Element {
  return (
    <Heading type={headingType} className='snapshot-ignore'>
      {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        formatPipeSeparatedString([name || lei, filingPeriod])
      }
    </Heading>
  );
}
export default InstitutionHeading;
