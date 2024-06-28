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

  if (lei) {
    href = `/institution/${lei}`;
    text = [name, lei].filter(Boolean).join(' | ');
  }

  return (
    <ListLink href={href} key={lei}>
      {text}
    </ListLink>
  );
}

export default AssociatedInstitution;
