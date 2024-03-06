import Head from 'components/Head';
// import { LoadingContent } from 'components/Loading';
import { Alert, Grid, Heading, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import { Five } from 'utils/constants';
// import { useAssociatedInstitutions } from 'utils/useAssociatedInstitutions';
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
            <main id='main-content' className='my-10'>
              <Heading type='1'>File your Small Business Lending data</Heading>
              <Alert
                message='2024 Annual filing period is open'
                status='success'
                className='mb-7'
              >
                Submissions of 2024 SBL data will be accepted through May 2025.
              </Alert>
              <div className='associated_institutions'>
                <Heading type='2'>Associated Institutions</Heading>
                <Paragraph isLead>
                  The following instututions are associated with your account,
                  allowing you to submit data on their behalf.
                </Paragraph>
                {[...Array.from({ length: Five }).keys()].map(institution => (
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
