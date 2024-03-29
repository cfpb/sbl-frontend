import AssociatedInstitution from 'components/AssociatedInstitution';
import { Alert, Heading, List, Paragraph } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { SubsectionWrapper } from './SubsectionWrapper';

export function ReviewInstitutions({
  institutions,
  error,
}: {
  institutions: InstitutionDetailsApiType[] | undefined;
  error: boolean | string | null;
}): JSX.Element {
  let institutionList = [];
  const hasInstitutions = (institutions?.length ?? 0) > 0;

  if (error) {
    institutionList = [
      <Alert
        isFieldLevel
        key='query-error'
        status='error'
        message='Unable to fetch institutions.'
      />,
    ];
  } else if (hasInstitutions) {
    institutionList = institutions.map(object => (
      <AssociatedInstitution key={object.lei} {...object} />
    ));
  } else {
    institutionList = [
      <Alert
        isFieldLevel
        key='no-associations'
        status='warning'
        message='You have no associated institutions.'
      />,
    ];
  }

  return (
    <SubsectionWrapper>
      <Heading type='3' className='heading'>
        View your associated financial institutions
      </Heading>
      <Paragraph>
        Your user profile has been successfully associated with the following
        financial institutions. Additional associations will not appear below
        until they are approved. You will not be able to file for additional
        financial institutions until those associations are approved.
      </Paragraph>
      <List isLinks className='institution-list'>
        {institutionList}
      </List>
    </SubsectionWrapper>
  );
}
export default ReviewInstitutions;
