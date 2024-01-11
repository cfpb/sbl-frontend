import { Icon, Link, ListItem } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';

export function AssociatedInstitution({
  name,
  lei,
}: InstitutionDetailsApiType): JSX.Element {
  let displayText = null;

  // Generate the Institution's label
  if (name && lei) displayText = `${name} | ${lei}`;
  else if (!name && !lei)
    displayText = 'Missing institution details; please contact support staff';
  else if (!lei)
    displayText = `"${name}" has no LEI; please contact support staff`;
  else if (!name) displayText = lei;

  // Do we have enough info to link to the Institution's details page?
  const institutionLabel = lei ? (
    <Link href={`/institution/${lei}`} type='list'>
      {displayText}
    </Link>
  ) : (
    <span>{displayText}</span>
  );

  return (
    <ListItem key={lei}>
      <Icon name='approved' withBg className='green' />
      <span className='status-label'>Approved</span>
      {institutionLabel}
    </ListItem>
  );
}

export default AssociatedInstitution;
