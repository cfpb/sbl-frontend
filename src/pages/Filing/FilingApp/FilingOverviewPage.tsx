import { Alert } from 'components/Alert';
import CrumbTrail from 'components/CrumbTrail';
import Head from 'components/Head';
import { LoadingContent } from 'components/Loading';
import { Grid, Heading, Link, Paragraph } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { ReactElement } from 'react';
import { useAssociatedInstitutions } from 'utils/useAssociatedInstitutions';
import { InstitutionCard } from './InstitutionCard';

// TODO: Display more informative errors, if available?
function DisplayErrors({ errors }: { errors: boolean }): JSXElement {
  if (!errors) return null;
  return (
    <Alert
      className='my-10 [&_div]:max-w-[41.875rem] [&_p]:max-w-[41.875rem]'
      status='error'
      message='There was an error loading your associated financial institutions.'
      links={[
        { href: '/landing', label: 'Return to SBL homepage' },
        {
          href: 'mailto:SBLHelp@cfpb.gov?subject=[BETA] Error when retrieving my associated institutions',
          label: 'Email our support staff',
        },
      ]}
    />
  );
}

// Filing overview: displaying the Filing status of each associated institution for the selected filing period
export default function FilingOverview(): ReactElement {
  const {
    data: associatedInstitutions,
    error: associatedInstitutionsError,
    isLoading: associatedInstitutionsLoading,
  } = useAssociatedInstitutions();

  if (associatedInstitutionsLoading) return <LoadingContent />;

  return (
    <>
      <Head title='File your small business lending data' />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8}>
            <CrumbTrail>
              <Link isRouterLink href='/landing'>
                Shared Landing
              </Link>
            </CrumbTrail>
            <main id='main' className='my-10'>
              <Heading type='1'>File your small business lending data</Heading>
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
              <DisplayErrors errors={!!associatedInstitutionsError} />
              <div className='associated_institutions mt-16'>
                {associatedInstitutions?.map(({ lei, name }) => (
                  <InstitutionCard
                    key={lei}
                    lei={lei}
                    name={name}
                    filingPeriod='2024'
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
