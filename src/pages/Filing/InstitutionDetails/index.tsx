import { useQuery } from '@tanstack/react-query';
import { Grid } from 'design-system-react';
import { useParams } from 'react-router-dom';
import { AffiliateInformation } from './AffiliateInformation';
import { ChangeHistory } from './ChangeHistory';
import { FinancialInstitutionDetails } from './FinancialInstitutionDetails';
import { IdentifyingInformation } from './IdentifyingInformation';
import { PageIntro } from './PageIntro';
import { fetchInstitutionDetails } from './fetchInstitutionDetails';

function InstitutionDetails({  }): JSX.Element {
  const {lei} = useParams()
  const { isLoading, isError, data } = useQuery(
    [`institution-details-${lei}`, Date.now()],
    fetchInstitutionDetails,
  );

  if (isLoading) return <>Loading!</>;
  if (isError) return <>Error!</>;

  return (
    <Grid.Wrapper center>
      <Grid.Row>
        <Grid.Column width={8}>
          <main id='main-content' className='my-10'>
            <PageIntro />
            <FinancialInstitutionDetails data={data} />
            <IdentifyingInformation data={data} />
            <AffiliateInformation data={data} />
            <ChangeHistory data={data} />
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid.Wrapper>
  );
}

export default InstitutionDetails;
