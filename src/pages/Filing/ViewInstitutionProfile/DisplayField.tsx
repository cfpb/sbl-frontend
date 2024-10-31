import classNames from 'classnames';
import CommonLinks from 'components/CommonLinks';
import { AlertFieldLevel, Heading, Link } from 'design-system-react';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import InstitutionDataLabels from '../formHelpers';
import './DisplayField.less';

export const NOT_AVAILABLE = 'Not available';
export const NOT_APPLICABLE = 'Not applicable';
export const NOT_PROVIDED = 'Not provided';
export const LAPSED = 'Lapsed';

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
      Your financial institution must have an active LEI to file. Visit{' '}
      <CommonLinks.GLIEF isExternalLink={false} /> for instructions on how to
      reactivate your LEI or{' '}
      <CommonLinks.EmailSupportStaff subject='Reactivating an LEI' /> for
      assistance.
    </p>
  ),
  [InstitutionDataLabels.tin]: (
    <p>
      You must provide your TIN to file. Visit <LinkUpdateInstitutionProfile />{' '}
      for instructions on how to update this information.
    </p>
  ),
  [InstitutionDataLabels.fiType]: (
    <p>
      You must provide your type of financial institution to file. Visit{' '}
      <LinkUpdateInstitutionProfile /> for instructions on how to provide this
      information.
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
  const showAlert = [LAPSED, NOT_PROVIDED].includes(resultingValue as string);

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
