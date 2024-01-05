import type { UserProfileObject } from 'api/fetchUserProfile';
import { Heading, Paragraph, WellContainer } from 'design-system-react';
import { DisplayField } from '../InstitutionDetails/DisplayField';

export default function UserInformation({
  data,
}: {
  data: UserProfileObject;
}): JSX.Element {
  return (
    <>
      <Heading type='3' className='u-mt45'>
        Identifying information
      </Heading>
      <Paragraph>
        The following reflects the first name, last name, and financial
        institution email address you use to log in through Login.gov in the
        fields below.
      </Paragraph>

      <WellContainer className='u-mt30'>
        <DisplayField label='First name' value={data.claims.given_name} />
        <DisplayField label='Last name' value={data.claims.family_name} />
        <DisplayField
          label='Email address'
          value={
            <>
              <Paragraph className='mb-[0.625rem]'>
                {data.claims.email}
              </Paragraph>
              <Paragraph className='font-sans-3xs'>
                This email address is used to log in through Login.gov.
              </Paragraph>
            </>
          }
        />
      </WellContainer>
    </>
  );
}
