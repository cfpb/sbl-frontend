import { useQuery } from '@tanstack/react-query';
import { fetchInstitutionDetails } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import CommonLinks from 'components/CommonLinks';
import CrumbTrail from 'components/CrumbTrail';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { Link } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import { Alert } from 'design-system-react';
import { useParams } from 'react-router-dom';
import { AffiliateInformation } from './AffiliateInformation';
import { FinancialInstitutionDetails } from './FinancialInstitutionDetails';
import { IdentifyingInformation } from './IdentifyingInformation';
import { PageIntro } from './PageIntro';

function InstitutionDetails(): JSX.Element | null {
  const { lei } = useParams();
  const auth = useSblAuth();

  const { isLoading, isError, data } = useQuery(
    [`institution-details-${lei}`],
    async () => fetchInstitutionDetails(auth, lei),
  );

  if (isLoading) return <LoadingContent />;

  const errorMessage = 'A problem occurred when trying to load your profile';

  const content = isError ? (
    <Alert status='error' message={errorMessage}>
      Try again in a few minutes. If this issues persists,{' '}
      <CommonLinks.EmailSupportStaff subject={`[Error] ${errorMessage}`} />.
    </Alert>
  ) : (
    <>
      <FinancialInstitutionDetails data={data} />
      <IdentifyingInformation data={data} />
      <AffiliateInformation data={data} />
      {/* TODO: include history of changes after MVP
          https://github.com/cfpb/sbl-project/issues/39
        <ChangeHistory /> 
        */}
    </>
  );

  return (
    <main id='main'>
      <CrumbTrail>
        <Link href='/landing' key='home'>
          Home
        </Link>
      </CrumbTrail>
      <FormWrapper isMarginTop={false}>
        <FormHeaderWrapper>
          <PageIntro />
        </FormHeaderWrapper>
        {content}
      </FormWrapper>
    </main>
  );
}

export default InstitutionDetails;
