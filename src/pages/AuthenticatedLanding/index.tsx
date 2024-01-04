import './Landing.less';

import AdditionalResources from 'components/AdditionalResources';
import { Divider, Hero, Layout, Link, ListItem } from 'design-system-react';
import type { ReactElement } from 'react';
import { FileSbl } from './FileSbl';
import { ReviewInstitutions } from './ReviewInstitutions';

function Landing(): ReactElement {
  return (
    <div id='landing-page'>
      <Layout.Main id='main' layout='2-1' bleedbar>
        <Hero
          heading='File your lending data'
          subheading='Upload your loan application data, review edits, certify the accuracy and completeness of the data, and submit data for the filing year.'
          backgroundColor='#EFF8FD'
        />
        <Layout.Wrapper>
          <Layout.Content id='main-content'>
            {/* <FileHMDA />
            <Divider/> */}
            <FileSbl />
            <Divider />
            <ReviewInstitutions />
          </Layout.Content>
          <Layout.Sidebar id='sidebar'>
            <AdditionalResources>
              <ListItem>
                <Link href={`/landing?${Date.now().toString()}`}>Link 1</Link>
              </ListItem>
              <ListItem>
                <Link href={`/landing?${Date.now().toString()}`}>Link 2</Link>
              </ListItem>
              <ListItem>
                <Link href={`/landing?${Date.now().toString()}`}>Link 3</Link>
              </ListItem>
            </AdditionalResources>
            {/* <Divider/> */}
            {/* <MailingListSignup     /> */}
          </Layout.Sidebar>
        </Layout.Wrapper>
      </Layout.Main>
    </div>
  );
}

export default Landing;
