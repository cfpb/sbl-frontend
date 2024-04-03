import { AssociatedInstitution } from 'components/AssociatedInstitution';
import { Link } from 'components/Link';
import { Heading, List, Paragraph, WellContainer } from 'design-system-react';
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
    <div className='associated-institutions'>
      <Heading type='2' className='u-mt60'>
        Associated financial institutions
      </Heading>
      <Paragraph>
        If the financial institution you are authorized to file for is not
        listed or if you are authorized to file for additional financial
        institutions, submit a request to{' '}
        <Link href='mailto:SBLHelp@cfpb.gov?subject=[BETA] View your user profile: Add additional authorized financial institutions'>
          email our support staff
        </Link>
        .
      </Paragraph>

      <WellContainer className='u-mt30'>
        <Heading type='3' className='h4 mb-[15px]'>
          Associated financial institutions
        </Heading>
        <List isLinks className='institution-list'>
          {associatedInstitutions.map(object => (
            <AssociatedInstitution {...object} key={object.lei} />
          ))}
        </List>
      </WellContainer>
    </div>
  );
}
