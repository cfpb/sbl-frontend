/* eslint-disable react/require-default-props */
import { Link } from 'components/Link';
import { Icon, ListItem } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'types/formTypes';

interface FirstLast {
  isFirst?: boolean;
  isLast?: boolean;
}

export function AssociatedInstitution({
  name,
  lei,
  isFirst,
  isLast,
}: FirstLast & InstitutionDetailsApiType): JSX.Element {
  let displayText = null;

  // Generate the Institution's label
  if (name && lei) displayText = `${name} | ${lei}`;
  else if (!name && !lei)
    displayText = 'Missing institution details; please contact support staff';
  else if (!lei)
    displayText = `"${name}" has no LEI; please contact support staff`;
  else if (!name) displayText = lei;

  let baseStylesListItem = `border-pacific visited:border-teal border-dashed border-0 border-t-[1px] py-[.625rem] my-0`;
  if (isLast) baseStylesListItem += ' border-b-[1px]';

  let desktopStylesListItem = 'lg:border-0 lg:pb-0';
  if (isFirst) desktopStylesListItem += ' lg:pt-0';
  if (isLast) desktopStylesListItem += ' lg:pb-0';

  return (
    <ListItem
      key={lei}
      className={`associated-institution ${baseStylesListItem} ${desktopStylesListItem}`}
    >
      <Icon
        className='mr-[5px] text-[#20aa3f]'
        isPresentational
        name='approved'
        withBg
      />
      <span className='mr-[10px] font-normal'>Approved</span>
      <Link
        href={lei ? `/institution/${lei}` : `/404`}
        className='border-0 font-medium'
      >
        {displayText}
      </Link>
    </ListItem>
  );
}

export default AssociatedInstitution;
