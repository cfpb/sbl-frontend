import CrumbTrail from 'components/CrumbTrail';
import { Link } from 'components/Link';
import { Layout, Paragraph, TextIntroduction } from 'design-system-react';
import type { ReactElement } from 'react';
import './Notices.less';

function PaperworkNotice(): ReactElement {
  return (
    <Layout.Main id='main' layout='2-1' bleedbar classes='notices'>
      <Layout.Wrapper>
        <Layout.Content flushBottom>
          <CrumbTrail>
            <Link href='/'>Home</Link>
          </CrumbTrail>
          <TextIntroduction
            heading='Paperwork Reduction Act statement'
            subheading='According to the Paperwork Reduction Act of 1995, an agency may not conduct or sponsor, and a person is not required to respond to a collection of information unless it displays a valid OMB control number.'
            description={
              <Paragraph>
                The OMB control number for this collection is 3170-0013. It
                expires on 08/31/2026. The time required to complete this
                information collection is estimated to be 3,098 hours annually
                per respondent. The obligation to respond to this collection of
                information is mandatory per the Equal Credit Opportunity Act
                (ECOA), 15 U.S.C. 1691 et seq., implemented by Regulation B, 12
                CFR Part 1002. Comments regarding this collection of
                information, including the estimated response time, suggestions
                for improving the usefulness of the information, or suggestions
                for reducing the burden to respond to this collection should be
                submitted to the Consumer Financial Protection Bureau
                (Attention: PRA Office), 1700 G Street NW, Washington, DC 20552,
                or by email to{' '}
                <Link href='mailto:PRA_comments@cfpb.gov'>
                  PRA_comments@cfpb.gov
                </Link>
                .
              </Paragraph>
            }
          />
        </Layout.Content>
      </Layout.Wrapper>
    </Layout.Main>
  );
}

export default PaperworkNotice;
