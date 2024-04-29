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
  let baseStylesLink = `inline-block w-full border-pacific visited:border-teal border-dashed border-0 border-t-[1px] py-[.625rem]`;
  if (isLast) baseStylesLink += ' border-b-[1px]';

  let desktopStylesLink = 'lg:border-0 lg:pb-0';
  if (isFirst) desktopStylesLink += ' lg:pt-0';
  if (isLast) desktopStylesLink += ' lg:pb-0';

  // Error
  if (!name || !lei)
    return (
      <ListItem key={lei} className='associated-institution my-0'>
        <Link
          href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Associated institutions: Missing "Name" or "LEI"'
          className={`${baseStylesLink} ${desktopStylesLink} font-medium`}
        >
          <Icon
            className='mr-[5px] text-[#20aa3f]'
            isPresentational
            name='approved'
            withBg
          />
          <span className='mr-[10px] font-normal text-[#101820]'>Approved</span>
          Missing institution details, email our support staff.
        </Link>
      </ListItem>
    );

  return (
    <ListItem key={lei} className='associated-institution my-0'>
      <Link
        href={lei ? `/institution/${lei}` : `/404`}
        className={`${baseStylesLink} ${desktopStylesLink} font-medium`}
      >
        <Icon
          className='mr-[5px] text-[#20aa3f]'
          isPresentational
          name='approved'
          withBg
        />
        <span className='mr-[10px] font-normal text-[#101820]'>Approved</span>
        {`${name} | ${lei}`}
      </Link>
    </ListItem>
  );
}

export default AssociatedInstitution;
