import CrumbTrail from 'components/CrumbTrail';
import {
  Layout,
  List,
  ListItem,
  Paragraph,
  TextIntroduction,
} from 'design-system-react';
import type { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './Notices.less';

function PrivacyNotice(): ReactElement {
  return (
    <Layout.Main layout='2-1' bleedbar classes='notices'>
      <Layout.Wrapper>
        <Layout.Content flushBottom>
          <CrumbTrail>
            <RouterLink to='/'>Platform home</RouterLink>
          </CrumbTrail>
          <TextIntroduction
            heading='Privacy Act notice'
            subheading={`The information in this system is being collected to facilitate the supervision of companies under the CFPB\u2019s authority.`}
            description={
              <>
                <Paragraph>
                  The information will be used by and disclosed to employees,
                  contractors, agents, and others authorized by the Consumer
                  Financial Protection Bureau to:
                </Paragraph>
                {/* TODO: all these bespoke spacing values should probably be replaced with DSR
                  spacing tokens by modifying the Tailwind theme, see:
                  https://github.com/cfpb/sbl-frontend/issues/103
                  */}
                <List className='mb-[1.875rem] list-disc'>
                  <ListItem>
                    <Paragraph>
                      Enforce statutory and regulatory purposes required under
                      Section 1071 of the Dodd-Frank Act;
                    </Paragraph>
                  </ListItem>
                  <ListItem>
                    <Paragraph>
                      Support another federal or state agency or regulatory
                      authority; and,
                    </Paragraph>
                  </ListItem>
                  <ListItem>
                    <Paragraph>
                      To a member of Congress; to the Department of Justice, a
                      court, an adjudicative body or administrative tribunal, or
                      a party in litigation.
                    </Paragraph>
                  </ListItem>
                </List>
                <Paragraph>
                  The collection of this information is authorized by Pub. L.
                  No. 111-203, Title X, Section 1011, 1012, 1021, 1024, and
                  1025, codified at 12 U.S.C. §§ 5491, 5492, 5511, 5514, and
                  5515.
                </Paragraph>
              </>
            }
          />
        </Layout.Content>
      </Layout.Wrapper>
    </Layout.Main>
  );
}

export default PrivacyNotice;
