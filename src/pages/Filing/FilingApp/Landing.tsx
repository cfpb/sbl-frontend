import Head from 'components/Head';
// import { LoadingContent } from 'components/Loading';
import { Grid, Heading, Link, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
// import { useAssociatedInstitutions } from 'utils/useAssociatedInstitutions';
import CrumbTrail from 'components/CrumbTrail';
import { Two } from 'utils/constants';
import { Institution } from './Institution';

export default function FilingLanding(): ReactElement {
  // TODO: Use real associatedInstitutions
  // const {
  //   isLoading: associatedInstitutionsLoading,
  //   error: associatedInstitutionsError,
  //   data: associatedInstitutions,
  // } = useAssociatedInstitutions();

  // console.log(
  //   associatedInstitutionsLoading,
  //   associatedInstitutionsError,
  //   associatedInstitutions,
  // );

  // if (associatedInstitutionsLoading) return <LoadingContent />;

  return (
    <>
      <Head title='File your Small Business Lending data' />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8}>
            <CrumbTrail>
              <Link isRouterLink href='/landing'>
                Shared Landing
              </Link>
            </CrumbTrail>
            <main id='main-content' className='my-10'>
              <Heading type='1'>File your Small Business Lending data</Heading>
              <Heading type='3'>
                You may file official small business lending data for your
                associated financial institutions. As you prepare to begin the
                filing process take a moment to review your financial
                institution profile.
              </Heading>
              <Paragraph>
                If the financial institution you are authorized to file for is
                not listed or if you are authorized to file for additional
                financial institutions, submit a request to update your user
                profile.
              </Paragraph>
              <div className='associated_institutions mt-16'>
                {[...Array.from({ length: Two }).keys()].map(institution => (
                  <Institution
                    key={institution}
                    status={String(institution)}
                    lei={`LEI-TEST-${institution}`}
                    name={`Test Bank ${institution}`}
                  />
                ))}
              </div>
            </main>
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}
