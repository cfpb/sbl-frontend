import useSblAuth from 'api/useSblAuth';
import {
  Divider,
  Layout,
  Link
} from 'design-system-react';
import type { ReactElement } from 'react';
import './FilingHome.less';


function Home(): ReactElement {
  const auth = useSblAuth();

  return (
    <div id='filing-home'>
      <Layout.Main id='main' layout='2-1' bleedbar>
        <Layout.Wrapper>
          <Layout.Content id='main-content'>
            <h1>Privacy Act Notice</h1>
            <p className="text-xl ">
            The information in this system is being collected to facilitate the supervision of
            companies under CFPB’s authority. <br />
            <p className="text-[16px] pt-3">The information will be used by and disclosed to employees, contractors, 
            agents, and others authorized by the Consumer Financial Protection Bureau to: </p>
            </p>
            <ul className=' list-disc text-base'>
                <li>
                <p className="text-[16px] text-[#101820]">Support another federal or state agency or regulatory authority; and,</p>
                </li>
                <li>
                <p className="text-[16px] text-[#101820]">Enforce statutory and regulatory purposes required under [rule citation to follow];</p>
                </li>
                <li>
                <p className="text-[16px] text-[#101820]">To a member of Congress; to the Department of Justice, a court, an adjudicative body or administrative tribunal, or a party in litigation.</p>
                </li>
              </ul>

<br /><p className="text-[16px]">
The collection of this information is authorized by Pub. L. No. 111-203, Title X, Section 1011, 1012, 1021, 1024, and 1025, codified at 12 U.S.C. §§ 5491, 5492, 5511, 5514, and 5515.”
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
    </div>
  );
}

export default Home;
