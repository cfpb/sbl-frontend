import { Heading, Icon, Link, List, ListItem, WellContainer } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';
import './AssociatedInstitutions.less';

export function AssociatedInstitutions({
  data: associatedInstitutions,
}: {
  data: InstitutionDetailsApiType[];
}): JSX.Element {
  return (
    <div className='associated-institutions'>
      <Heading type='3' className='u-mt45'>
        Financial institution associations
      </Heading>
      <p>
        If the financial institution you are authorized to file for is not shown below or if you are 
        authorized to file for additional institutions, complete the{' '}
        {/* TODO: replace this generic SBL Help link with a specific Salesforce form link, see: */}
        {/* https://github.com/cfpb/sbl-frontend/issues/109 */}
        <Link href="https://sblhelp.consumerfinance.gov/">
          update your user profile
        </Link>{' '}
        form.
      </p>

      <WellContainer className='u-mt30'>
         <Heading type="4">
           Associated financial institutions 
         </Heading>
        <List isLinks className='institution-list'>
          {associatedInstitutions.map(object => (
              <ListItem key={object.lei}>
                  <Icon name='approved' withBg className='green' />
                  <span className='status-label'>Approved</span>
                  <Link href={`/institution/${object.lei}`} type='list'>
                    {object.name} | {object.lei}
                  </Link>
                </ListItem>
            ))}
        </List>
      </WellContainer>
    </div>
  );
}

export default AssociatedInstitutions;
