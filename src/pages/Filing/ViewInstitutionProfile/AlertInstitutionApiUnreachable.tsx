import CommonLinks from 'components/CommonLinks';
import { Alert } from 'design-system-react';

export const MESSAGE_INSTITUTION_API_DOWN =
  'A problem occurred when trying to load your profile';

export interface InstitutionApiErrorWrapperType {
  isError?: boolean;
  children: JSX.Element | JSX.Element[];
}

// Shared page-level alert for Institution API errors
export function AlertInstitutionApiUnreachable({
  isError,
  children,
}: InstitutionApiErrorWrapperType): JSX.Element {
  if (isError)
    return (
      <Alert status='error' message={MESSAGE_INSTITUTION_API_DOWN}>
        <p>
          Try again in a few minutes. If this issues persists,{' '}
          <CommonLinks.EmailSupportStaff
            subject={`[Error] ${MESSAGE_INSTITUTION_API_DOWN}`}
          />
          .
        </p>
      </Alert>
    );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

AlertInstitutionApiUnreachable.defaultProps = {
  isError: false,
};

export default AlertInstitutionApiUnreachable;
