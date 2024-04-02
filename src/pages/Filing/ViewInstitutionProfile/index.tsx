import { useQuery } from '@tanstack/react-query';
import { fetchInstitutionDetails } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { Link } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import { useParams } from 'react-router-dom';
import { useError500 } from '../../Error/Error500';
import { AffiliateInformation } from './AffiliateInformation';
import { FinancialInstitutionDetails } from './FinancialInstitutionDetails';
import { IdentifyingInformation } from './IdentifyingInformation';
import { PageIntro } from './PageIntro';

function InstitutionDetails(): JSX.Element | null {
  const { lei } = useParams();
  const auth = useSblAuth();
  const redirect500 = useError500();

  const { isLoading, isError, data } = useQuery(
    [`institution-details-${lei}`],
    async () => fetchInstitutionDetails(auth, lei),
  );

  if (isLoading) return <LoadingContent />;
  if (isError)
    return redirect500({
      message: 'Unable to fetch institution details.',
    });

  return (
    <main id='main'>
      <CrumbTrail>
        <Link href='/landing' key='home'>
          Platform home
        </Link>
      </CrumbTrail>
      <FormWrapper isMarginTop={false}>
        <FormHeaderWrapper crumbTrailMarginTop>
          <PageIntro />
        </FormHeaderWrapper>
        <FinancialInstitutionDetails data={data} />
        <IdentifyingInformation data={data} />
        <AffiliateInformation data={data} />
        {/* TODO: include history of changes after MVP
          https://github.com/cfpb/sbl-project/issues/39
        <ChangeHistory /> 
        */}
      </FormWrapper>
    </main>
  );
}

export default InstitutionDetails;
