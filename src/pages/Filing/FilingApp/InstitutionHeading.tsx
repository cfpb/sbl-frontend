import { Link } from 'components/Link';
import { Heading } from 'design-system-react';
import type { HeadingType } from 'design-system-react/dist/components/Headings/Heading';
import type { InstitutionDataType } from './InstitutionCard.types';

// Format the Institution name + LEI
function InstitutionHeading({
  name,
  lei,
  filingPeriod,
  headingType = '5',
  isProfileLink = false,
}: InstitutionDataType & {
  // eslint-disable-next-line react/require-default-props
  headingType?: HeadingType;
  // eslint-disable-next-line react/require-default-props
  isProfileLink?: boolean;
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const content = [name || lei, filingPeriod]
    .filter(Boolean)
    .join(`${'\u00A0\u00A0'}|${'\u00A0\u00A0'}`);

  if (isProfileLink && lei)
    return (
      <Heading type={headingType}>
        <Link isRouterLink href={`/institution/${lei}`}>
          {content}
        </Link>
      </Heading>
    );

  return <Heading type={headingType}>{content}</Heading>;
}
export default InstitutionHeading;
