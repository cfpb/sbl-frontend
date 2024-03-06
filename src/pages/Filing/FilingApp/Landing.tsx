import Head from 'components/Head';
import { LoadingContent } from 'components/Loading';
import { Alert, Grid, Heading, Paragraph } from 'design-system-react';
import type { ReactElement } from 'react';
import { Five } from 'utils/constants';
import { useAssociatedInstitutions } from 'utils/useAssociatedInstitutions';
import { Institution } from './Institution';

export default function FilingLanding(): ReactElement {
  const {
    isLoading: associatedInstitutionsLoading,
    // error: associatedInstitutionsError,
    data: associatedInstitutions,
  } = useAssociatedInstitutions();

  if (associatedInstitutionsLoading) return <LoadingContent />;

  // TODO: Use real associatedInstitutions
  const institutions = [...Array.from({ length: Five }).keys()].map(
    number_ => ({
      ...associatedInstitutions[0],
      lei: `LEI-TEST-${number_}`,
      name: `Test Bank ${number_}`,
      status: String(number_),
    }),
  );

  return (
    <>
      <Head title='File your Small Business Lending data' />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8}>
            <main id='main-content' className='my-10'>
              <Heading type='1'>File your Small Business Lending data</Heading>
              <Alert
                message='2025-Q1 Quarterly filing period is open'
                status='success'
                className='mb-7'
              >
                Submissions of 2025-Q1 SBL data will be accepted through May
                2025.
              </Alert>
              <div className='associated_institutions'>
                <Heading type='2'>Associated Institutions</Heading>
                <Paragraph isLead>
                  The following instututions are associated with your account,
                  allowing you to submit data on their behalf.
                </Paragraph>
                {institutions.map(institution => (
                  <Institution key={institution.lei} {...institution} />
                ))}
              </div>
            </main>
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}
