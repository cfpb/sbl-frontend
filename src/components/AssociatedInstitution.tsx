/* eslint-disable react/require-default-props */
import { ListLink } from 'components/Link';
import type { InstitutionDetailsApiType } from 'types/formTypes';

export function AssociatedInstitution({
  name,
  lei,
}: InstitutionDetailsApiType): JSX.Element {
  let href =
    'mailto:SBLHelp@cfpb.gov?subject=[BETA] Associated institutions: Missing "Name" or "LEI"';
  let text = 'Missing institution details, email our support staff.';

  // We have all the required information to build a link
  if (name && lei) {
    href = `/institution/${lei}`;
    text = `${name} | ${lei}`;
  }

  return (
    <ListLink
      aria-label={`View institution profile for: ${text}`}
      href={href}
      key={lei}
    >
      {text}
    </ListLink>
  );
}

export default AssociatedInstitution;
