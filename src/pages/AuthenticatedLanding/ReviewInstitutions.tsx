import AssociatedInstitutionList from 'components/AssociatedInstitutionList';
import { Alert, Heading, Paragraph } from 'design-system-react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { SubsectionWrapper } from './SubsectionWrapper';

export function ReviewInstitutions({
  institutions,
  error,
}: {
  institutions: InstitutionDetailsApiType[] | undefined;
  error: boolean | string | null;
}): JSX.Element {
  let institutionList: JSX.Element | JSX.Element[];
  const hasInstitutions = (institutions?.length ?? 0) > 0;
  const sharedStyles = 'u-mt15';

  if (error) {
    institutionList = (
      <AssociatedInstitutionList className={sharedStyles}>
        <Alert
          key='query-error'
          status='error'
          message='There was a problem loading your associated financial institutions'
          className='mt-[1.875rem]'
          links={[
            {
              href: 'mailto:SBLHelp@cfpb.gov?subject=[BETA] Filing app: Error loading associated institutions',
              label: 'Email our support staff',
            },
          ]}
        />
      </AssociatedInstitutionList>
    );
  } else if (hasInstitutions) {
    institutionList = (
      <AssociatedInstitutionList
        institutions={institutions}
        className={sharedStyles}
        key='institutions'
      />
    );
  } else {
    institutionList = (
      <AssociatedInstitutionList className={sharedStyles}>
        <Alert
          isFieldLevel
          key='no-associations'
          status='warning'
          message='You have no associated institutions.'
        />
      </AssociatedInstitutionList>
    );
  }

  return (
    <SubsectionWrapper>
      <Heading type='3' className='heading'>
        Review your financial institution profile
      </Heading>
      <Paragraph>
        You are required to provide certain identifying information about your
        associated financial institutions as part of your filing. Click on your
        financial institution to view or update your financial institution
        profile.
      </Paragraph>
      {institutionList}
    </SubsectionWrapper>
  );
}
export default ReviewInstitutions;
