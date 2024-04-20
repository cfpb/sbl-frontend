import { Icon } from 'design-system-react';
import type { ReactNode } from 'react';
import { useId } from 'react';

interface InlineStatusLineProperties {
  status: string;
  className: string;
  message: ReactNode;
}

function InlineStatusLine({
  status = '',
  className,
  message = '',
  ...other
}: InlineStatusLineProperties): JSX.Element {
  const iconId = useId();
  return (
    <div>
      <Icon
        isPresentational
        ariaLabelledby={iconId}
        name={status || 'updating'}
        // @ts-expect-error needs to be fixed in the DSR
        className={`${
          status ? '' : 'updating invisible'
        } mr-[0.3125rem] inline-block ${className}`}
        withBg={status !== 'updating'}
        {...other}
      />
      <span id={iconId} className='inline-block'>
        {message}
      </span>
    </div>
  );
}

interface InlineStatusOption {
  condition: unknown;
  value: string;
}

interface InlineStatusProperties {
  statusOptions: InlineStatusOption[];
  classNameOptions: InlineStatusOption[];
  messageOptions: InlineStatusOption[];
}

function InlineStatus({
  statusOptions,
  classNameOptions,
  messageOptions,
}: InlineStatusProperties): JSX.Element {
  // const statusOptions: StatusOption[] = [
  //   { condition: isLoadingUpload, value: 'updating' },
  //   { condition: errorUpload, value: 'error' },
  //   { condition: dataUpload || dataGetSubmissionLatest, value: 'approved' },
  //   { condition: true, value: '' }, // Default condition
  // ];

  // const classNameOptions: StatusOption[] = [
  //   { condition: isLoadingUpload, value: 'text-inProgressUploadValidation' },
  //   { condition: errorUpload, value: 'text-errorColor' },
  //   { condition: dataUpload || dataGetSubmissionLatest, value: 'text-successColor' },
  //   { condition: true, value: 'text-[#0072CE]' }, // Default condition
  // ];

  // const messageOptions: StatusOption[] = [
  //   { condition: isLoadingUpload, value: 'Upload in progress' },
  //   { condition: errorUpload, value: 'Upload failed' },
  //   { condition: dataUpload || dataGetSubmissionLatest, value: 'Upload complete' },
  //   { condition: true, value: '' }, // Default condition
  // ];

  // Define options arrays for status, className, and message
  // const statusOptions = [
  //   { condition: isLoadingUpload, value: '' },
  //   { condition: errorUpload, value: 'error' },
  //   { condition: isFetchingGetSubmissionLatest, value: 'updating' },
  //   { condition: errorGetSubmissionLatest || (dataGetSubmissionLatest?.state === FileSubmissionState.VALIDATION_ERROR), value: 'error' },
  //   { condition: dataGetSubmissionLatest, value: 'approved' },
  //   { condition: true, value: '' }, // Default condition
  // ];

  // const classNameOptions = [
  //   { condition: isFetchingGetSubmissionLatest || isLoadingUpload, value: 'text-inProgressUploadValidation' },
  //   { condition: errorUpload || errorGetSubmissionLatest || (dataGetSubmissionLatest?.state === FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED) || (dataGetSubmissionLatest?.state === FileSubmissionState.VALIDATION_ERROR), value: 'text-errorColor' },
  //   { condition: dataGetSubmissionLatest, value: 'text-successColor' },
  //   { condition: true, value: 'text-[#0072CE]' }, // Default condition
  // ];

  // const messageOptions = [
  //   { condition: isFetchingGetSubmissionLatest, value: 'Validation in progress' },
  //   { condition: errorUpload || isLoadingUpload, value: 'Validation not started' },
  //   { condition: errorGetSubmissionLatest || (dataGetSubmissionLatest?.state === FileSubmissionState.SUBMISSION_UPLOAD_MALFORMED) || (dataGetSubmissionLatest?.state === FileSubmissionState.VALIDATION_ERROR), value: 'Validation failed' },
  //   { condition: dataGetSubmissionLatest, value: 'Validation complete' },
  //   { condition: true, value: 'Validation not started' }, // Default condition
  // ];

  const getStatus = (): string => {
    const { value } = statusOptions.find(option => option.condition) ?? {};
    return value ?? '';
  };

  const getStatusClassName = (): string => {
    const { value } = classNameOptions.find(option => option.condition) ?? {};
    return value ?? 'text-[#0072CE]';
  };

  const getMessage = (): JSX.Element | null => {
    const { value } = messageOptions.find(option => option.condition) ?? {};
    return value ? <span className='font-medium'>{value}</span> : null;
  };
  return (
    <InlineStatusLine
      status={getStatus()}
      className={getStatusClassName()}
      message={getMessage()}
    />
  );
}

export default InlineStatus;
