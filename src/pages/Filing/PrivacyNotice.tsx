import CrumbTrail from 'components/CrumbTrail';
import { Link } from 'components/Link';
import { Layout, TextIntroduction } from 'design-system-react';
import type { ReactElement } from 'react';
import './Notices.less';

function PrivacyNotice(): ReactElement {
  return (
    <Layout.Main id='main' layout='2-1' bleedbar classes='notices'>
      <Layout.Wrapper>
        <Layout.Content flushBottom>
          <CrumbTrail>
            <Link href='/'>Home</Link>
          </CrumbTrail>
          <TextIntroduction
            heading='Privacy Notice'
            subheading='The Consumer Financial Protection Bureau (CFPB) is collecting data to test the functionality of the Small Business Lending Data Filing Platform.'
            description='The testing will help ensure that the system can support the submission of data needed to enforce fair lending laws pursuant to Public Law No. 111-203, Title X, Section 1071, codified at 12 C.F.R. 1002. Participation is voluntary. If you choose to participate, the CFPB will collect your first and last name to test the "Complete your user profile" page. The CFPB will not use the data for any other purpose besides testing. Please do not submit any live data in the system.'
          />
        </Layout.Content>
      </Layout.Wrapper>
    </Layout.Main>
  );
}

export default PrivacyNotice;
