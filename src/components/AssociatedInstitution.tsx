/* eslint-disable react/require-default-props */
import { Link } from 'components/Link';
import { Icon } from 'design-system-react';
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
  let baseStylesLink = `inline-block w-full border-pacific visited:border-teal border-dashed border-0 border-t-[1px] py-[.625rem] mb-0`;
  if (isLast) baseStylesLink += ' border-b-[1px]';

  let desktopStylesLink = ' lg:border-0 lg:pb-0';
  if (isFirst) desktopStylesLink += ' lg:pt-0';
  if (isLast) desktopStylesLink += ' lg:pb-0';

  let href =
    'mailto:SBLHelp@cfpb.gov?subject=[BETA] Associated institutions: Missing "Name" or "LEI"';
  let text = 'Missing institution details, email our support staff.';

  // We have all the required information to build a link
  if (name && lei) {
    href = `/institution/${lei}`;
    text = `${name} | ${lei}`;
  }

  return (
    <li className={baseStylesLink + desktopStylesLink}>
      <Icon
        className='mr-[5px] text-[#20aa3f]'
        isPresentational
        name='approved'
        withBg
      />
      <span className='mr-[0.625rem] font-normal text-[#101820]'>Approved</span>
      <Link
        href={href}
        key={lei}
        className='associated-institution  my-0 font-medium max-lg:border-b-0'
      >
        {text}
      </Link>
    </li>
  );
}

export default AssociatedInstitution;
