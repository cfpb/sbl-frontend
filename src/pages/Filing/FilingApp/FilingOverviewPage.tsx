import Links from 'components/CommonLinks';
import CrumbTrail from 'components/CrumbTrail';
import Head from 'components/Head';
import { LoadingContent } from 'components/Loading';
import { Alert, Link, Paragraph, TextIntroduction } from 'design-system-react';
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
    <div className='mx-auto max-w-[48.25rem]'>
      <Head title='File your small business lending data' />
      <CrumbTrail>
        <Link isRouterLink href='/landing'>
          Platform home
        </Link>
      </CrumbTrail>
      <main id='main' className='u-mt30 u-mb60'>
        <div className='max-w-[41.875rem]'>
          <TextIntroduction
            heading='File your small business lending data'
            subheading='You may use this platform to upload your small business lending application register, review the results of validation checks, certify the accuracy and completeness of the data reported, and submit your filing to the CFPB.'
            description={
              <Paragraph>
                If the financial institution you are authorized to file for is
                not listed or if you are authorized to file for additional
                financial institutions,{' '}
                <Links.EmailSupportStaff subject='Associated financial institutions' />
                .
              </Paragraph>
            }
          />
        </div>
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
    </div>
  );
}
