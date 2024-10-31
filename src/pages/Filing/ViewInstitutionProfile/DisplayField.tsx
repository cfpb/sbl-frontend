import classNames from 'classnames';
import { AlertFieldLevel, Heading, Link } from 'design-system-react';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import InstitutionDataLabels from '../formHelpers';
import './DisplayField.less';

export const NOT_AVAILABLE = 'Not available';
export const NOT_APPLICABLE = 'Not applicable';
export const NOT_PROVIDED = 'Not provided';

function LinkUpdateInstitutionProfile(): JSX.Element {
  const { lei } = useParams();

  return (
    <Link href={`/institution/${lei}/update`}>
      update your financial institution profile
    </Link>
  );
}

const NotProvidedAlertMessage = {
  [InstitutionDataLabels.tin]: (
    <p>
      You must provide your TIN to file. For instructions on how to provide your
      TIN visit <LinkUpdateInstitutionProfile />.
    </p>
  ),
  [InstitutionDataLabels.fiType]: (
    <p>
      You must provide your type of financial institution to file. To provide
      this information visit <LinkUpdateInstitutionProfile />.
    </p>
  ),
};

export interface DisplayFieldProperties {
  label?: ReactNode;
  value?: ReactNode;
  className?: string;
  fallbackValue?: string;
}

export function DisplayField({
  label,
  value,
  className,
  fallbackValue,
}: DisplayFieldProperties): JSX.Element {
  const resultingValue = value ?? fallbackValue;
  const showAlert = resultingValue === NOT_PROVIDED;

  return (
    <div className={classNames('display-field', className)}>
      {label ? (
        <Heading className='h4 break-all' type='3'>
          {label}
        </Heading>
      ) : undefined}
      <p className='u-mt10 break-all'>{resultingValue}</p>
      <AlertFieldLevel
        status='warning'
        isVisible={showAlert}
        message={NotProvidedAlertMessage[label as string]}
      />
    </div>
  );
}

DisplayField.defaultProps = {
  className: undefined,
  fallbackValue: NOT_APPLICABLE,
  label: undefined,
  value: undefined,
};
