import AssociatedInstitutionList from 'components/AssociatedInstitutionList';
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import { WellContainer } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'types/formTypes';

export default function AssociatedInstitutions({
  data: associatedInstitutions,
}: {
  data: InstitutionDetailsApiType[];
}): JSX.Element {
  // TODO: Cleanup once we get resolution on how to handle edge cases
  // Design suggestions
  //   - Field level alert when an instituion doesn't have all info?
  //   - One error message for all, not individualized for each missing element?
  // const testMissingDataScenarios = [
  //   ...associatedInstitutions,
  //   { lei: 'LEI-BUT-NO-NAME' },
  //   { name: 'Bank with Name but no LEI' },
  //   {},
  // ];
  return (
    <div className='associated-institutions u-mt60'>
      <SectionIntro heading='Associated financial institutions'>
        If the financial institution you are authorized to file for is not
        listed or if you are authorized to file for additional financial
        institutions,{' '}
        <Link href='mailto:SBLHelp@cfpb.gov?subject=[BETA] View your user profile: Add additional authorized financial institutions'>
          email our support staff
        </Link>
        .
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <AssociatedInstitutionList institutions={associatedInstitutions} />
      </WellContainer>
    </div>
  );
}
