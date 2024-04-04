import { Link } from 'components/Link';
import { Icon, ListItem } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'types/formTypes';

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
    <Link href={`/institution/${lei}`} className='font-medium'>
      {displayText}
    </Link>
  ) : (
    <span>{displayText}</span>
  );

  return (
    <ListItem key={lei} className='associated-institution'>
      <Icon
        className='mr-[5px] text-[#20aa3f]'
        isPresentational
        name='approved'
        withBg
      />
      <span className='mr-[10px] font-normal'>Approved</span>
      {institutionLabel}
    </ListItem>
  );
}

export default AssociatedInstitution;
