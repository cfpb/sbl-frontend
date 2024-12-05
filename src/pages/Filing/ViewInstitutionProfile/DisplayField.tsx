import classNames from 'classnames';
import CommonLinks from 'components/CommonLinks';
import { AlertFieldLevel, Heading, Link } from 'design-system-react';
import type { AlertFieldLevelType } from 'design-system-react/dist/components/Alert/AlertFieldLevel';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import InstitutionDataLabels from '../formHelpers';
import './DisplayField.less';

export const NOT_AVAILABLE = 'Not available';
export const NOT_APPLICABLE = 'Not applicable';
export const NOT_PROVIDED = 'Not provided';
export const ISSUED = 'Issued';
export const LAPSED = 'Lapsed';
export const RETIRED = 'Retired';

function LinkUpdateInstitutionProfile(): JSX.Element {
  const { lei } = useParams();

  return (
    <Link href={`/institution/${lei}/update`}>
      update your financial institution profile
    </Link>
  );
}

const NotProvidedAlertMessage = {
  [InstitutionDataLabels.leiStatus]: (
    <p>
      Your LEI registration status must be &quot;Issued&quot; to file. If you
      need to renew your LEI registration, contact your Local Operating Unit
      (LOU) or visit <CommonLinks.GLIEF isExternalLink={false} /> to identify
      your LOU.
    </p>
  ),
  [InstitutionDataLabels.tin]: (
    <p>
      You must provide your TIN to file. Visit <LinkUpdateInstitutionProfile />{' '}
      for instructions on how to provide this information.
    </p>
  ),
  [InstitutionDataLabels.fiType]: (
    <p>
      You must provide your type of financial institution to file. Visit{' '}
      <LinkUpdateInstitutionProfile /> to provide this information.
    </p>
  ),
};

export interface DisplayFieldProperties {
  label?: ReactNode;
  value?: ReactNode;
  className?: string;
  fallbackValue?: string;
  alertStatus?: AlertFieldLevelType;
}

export function DisplayField({
  label,
  value,
  className,
  fallbackValue,
  alertStatus,
}: DisplayFieldProperties): JSX.Element {
  // This is needed otherwise a falsy value will only fallback if value is null or undefined
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const resultingValue = value || fallbackValue;
  const showAlert = [LAPSED, NOT_PROVIDED].includes(resultingValue as string);

  return (
    <div className={classNames('display-field', className)}>
      {label ? (
        <Heading className='h4' type='3'>
          {label}
        </Heading>
      ) : undefined}
      <p className='u-mt10'>{resultingValue}</p>
      <AlertFieldLevel
        status={alertStatus}
        isVisible={showAlert}
        message={NotProvidedAlertMessage[label as string]}
      />
    </div>
  );
}

DisplayField.defaultProps = {
  alertStatus: 'warning',
  className: undefined,
  fallbackValue: NOT_APPLICABLE,
  label: undefined,
  value: undefined,
};
