import { useQuery } from '@tanstack/react-query';
import { Grid } from 'design-system-react';
import { useParams } from 'react-router-dom';
import useSblAuth from '../../../api/useSblAuth';
import CrumbTrail from '../../../components/CrumbTrail';
import { AffiliateInformation } from './AffiliateInformation';
import { FinancialInstitutionDetails } from './FinancialInstitutionDetails';
import { IdentifyingInformation } from './IdentifyingInformation';
import { PageIntro } from './PageIntro';
import { fetchInstitutionDetails } from 'api/fetchInstitutionDetails';

function InstitutionDetails(): JSX.Element {
  const { lei } = useParams();
  const auth = useSblAuth();

  const { isLoading, isError, data } = useQuery(
    [`institution-details-${lei}`],
    async () => fetchInstitutionDetails(auth, lei),
  );

  if (isLoading) return <>Loading Institutions Details!</>;
  if (isError) return <>Error on loading institutions details!</>;

  return (
    <Grid.Wrapper center>
      <Grid.Row>
        <Grid.Column width={8}>
          <main id='main-content' className='my-10'>
            <CrumbTrail>
              <a href='/' key='home'>
                Platform home
              </a>
            </CrumbTrail>
            <PageIntro />
            <FinancialInstitutionDetails data={data} />
            <IdentifyingInformation data={data} />
            <AffiliateInformation data={data} />
            {/* TODO: include history of changes after MVP
               https://github.com/cfpb/sbl-project/issues/39
            
            <ChangeHistory /> 
            */}
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid.Wrapper>
  );
}

export default InstitutionDetails;
