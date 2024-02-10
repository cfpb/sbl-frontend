import type { UserProfileObject } from 'api/oidc';
import { Link } from 'components/Link';
import { Heading, Paragraph, WellContainer } from 'design-system-react';
import { loginGovAccountPage } from 'utils/common';
import { DisplayField } from '../ViewInstitutionProfile/DisplayField';

export default function UserInformation({
  data,
}: {
  data: UserProfileObject;
}): JSX.Element {
  return (
    <>
      <Heading type='2' className='u-mt60'>
        Identifying information
      </Heading>
      <Paragraph>
        The following reflects the user information we have on file for you. To
        make a change to your email address{' '}
        <Link href={loginGovAccountPage}>
          visit your Login.gov account page
        </Link>
        .
      </Paragraph>

      <WellContainer className='u-mt30'>
        <DisplayField label='First name' value={data.claims.given_name} />
        <DisplayField label='Last name' value={data.claims.family_name} />
        <DisplayField
          label='Email address'
          value={
            <Paragraph className='mb-[0.625rem]'>{data.claims.email}</Paragraph>
          }
        />
      </WellContainer>
    </>
  );
}
