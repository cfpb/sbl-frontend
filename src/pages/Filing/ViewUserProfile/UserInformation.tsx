import type { UserProfileObject } from 'api/oidc';
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import { Paragraph, WellContainer } from 'design-system-react';
import { loginGovAccountPage } from 'utils/common';
import { DisplayField } from '../ViewInstitutionProfile/DisplayField';

export default function UserInformation({
  data,
}: {
  data: UserProfileObject;
}): JSX.Element {
  return (
    <>
      <SectionIntro heading='Identifying information'>
        The following reflects the identifying information we have on file for
        you. To make an update to your email address{' '}
        <Link href={loginGovAccountPage}>
          visit your Login.gov account page
        </Link>
        .
      </SectionIntro>

      <WellContainer className='u-mt30'>
        {/* TODO: Find out where the claims went */}
        {/* <DisplayField label='First name' value={data.claims.given_name} />
        <DisplayField label='Last name' value={data.claims.family_name} /> */}
        <DisplayField
          label='Full name'
          value={<Paragraph className='mb-[0.625rem]'>{data.name}</Paragraph>}
        />
        <DisplayField
          label='Email address'
          value={<Paragraph className='mb-[0.625rem]'>{data.email}</Paragraph>}
        />
      </WellContainer>
    </>
  );
}
