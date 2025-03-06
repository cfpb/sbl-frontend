import AdditionalResources from 'components/AdditionalResources';
import BetaAndLegalNotice from 'components/BetaAndLegalNotice';
import { ListLink } from 'components/Link';
import { Divider, Hero, Layout } from 'design-system-react';
import type { ReactElement } from 'react';
import { LoadingContent } from '../../components/Loading';
import { useAssociatedInstitutions } from '../../utils/useAssociatedInstitutions';
import { FileSbl } from './FileSbl';
import './Landing.less';
import { ReviewInstitutions } from './ReviewInstitutions';

function Landing(): ReactElement | null {
  const {
    isLoading: associatedInstitutionsLoading,
    error: associatedInstitutionsError,
    data: associatedInstitutions,
  } = useAssociatedInstitutions();

  if (associatedInstitutionsLoading) return <LoadingContent />;

  return (
    <div id='landing-page'>
      <Layout.Main id='main' layout='2-1' bleedbar>
        <Hero
          heading='File your lending data'
          subheading='Upload your loan application data, review validations, certify the accuracy and completeness of the data, and submit data for the filing year.'
        />
        <Layout.Wrapper>
          <Layout.Content id='main-content'>
            {/* 
            TODO: Include link to Filing app once it's built
            <FileHMDA />
            <Divider/> 
            */}
            <BetaAndLegalNotice />
            <FileSbl />
            <Divider />
            <ReviewInstitutions
              institutions={associatedInstitutions}
              error={!!associatedInstitutionsError}
            />
          </Layout.Content>
          <Layout.Sidebar id='sidebar'>
            <AdditionalResources>
              <ListLink href='https://www.consumerfinance.gov/rules-policy/final-rules/small-business-lending-under-the-equal-credit-opportunity-act-regulation-b/'>
                Final Rule
              </ListLink>
              <ListLink href='https://www.consumerfinance.gov/data-research/small-business-lending/filing-instructions-guide/2024-guide/'>
                Filing instructions guide
              </ListLink>
              <ListLink href='https://www.consumerfinance.gov/compliance/compliance-resources/small-business-lending-resources/small-business-lending-collection-and-reporting-requirements/'>
                Collection and reporting requirements
              </ListLink>
            </AdditionalResources>
            {/* 
            TODO: Include Mailing List signup post-MVP
            <Divider />
            <MailingListSignup /> 
            */}
          </Layout.Sidebar>
        </Layout.Wrapper>
      </Layout.Main>
    </div>
  );
}

export default Landing;
