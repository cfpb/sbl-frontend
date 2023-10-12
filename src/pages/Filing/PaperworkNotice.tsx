import {
  Divider,
  Layout,
  Link
} from 'design-system-react';
import type { ReactElement } from 'react';

function PaperworkNotice(): ReactElement {
  return (
    <Layout.Main id='main' layout='2-1' bleedbar>
      <Layout.Wrapper>
        <Layout.Content id='main-content'>
          <h1>Paperwork Reduction Act</h1>
          <p className="text-xl mb-0">
            According to the Paperwork Reduction Act of 1995, an agency may
            not conduct or sponsor, and a person is not required to respond
            to a collection of information unless it displays a valid OMB
            control number.
          </p> 
          <br />
          <p>
            The OMB control number for this collection is 3170-0013. It
            expires on 08/31/2026. The time required to complete this
            information collection is estimated to be 3,098 hours annually
            per respondent. The obligation to respond to this collection
            of information is mandatory per the Equal Credit Opportunity
            Act (ECOA), 15 U.S.C. 1691 et seq., implemented by Regulation
            B, 12 CFR Part. Comments regarding this collection of
            information, including the estimated response time, suggestions 
            for improving the usefulness of the information, or suggestions 
            for reducing the burden to respond to this collection should be 
            submitted to Bureau at the Consumer Financial Protection Bureau 
            (Attention: PRA Office), 1700 G Street NW, Washington, DC 20552, 
            or by email to {' '}
            <Link href='mailto:PRA_comments@cfpb.gov'>PRA_comments@cfpb.gov</Link>
          </p>
        </Layout.Content>
        <Layout.Sidebar id='sidebar'>
          <div className='additional-resources'>
            <h5 className='heading'>ADDITIONAL RESOURCES</h5>
            <ul className='mt-[1em] pl-0 list-none'>
              <li className='mb-[1em]'>
                <Link href='#'>Final Rule</Link>
              </li>
              <li className='mb-[1em]'>
                <Link href='#'>Resources for small business owners</Link>
              </li>
            </ul>
          </div>
          <Divider className='mt-[3em] mb-[2em]' />
        </Layout.Sidebar>
      </Layout.Wrapper>
    </Layout.Main>
  );
}

export default PaperworkNotice;
