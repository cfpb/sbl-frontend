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
        message='There was an error loading your associated financial institutions'
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
        Review your financial institution profile
      </Heading>
      <Paragraph>
        You are required to provide certain identifying information about your
        associated financial institutions as part of your submission. Click on
        your financial institution to view or update your financial institution
        profile.
      </Paragraph>
      <List isLinks className='institution-list'>
        {institutionList}
      </List>
    </SubsectionWrapper>
  );
}
export default ReviewInstitutions;
