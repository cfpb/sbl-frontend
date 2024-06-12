import downloadValidationReport from 'api/requests/downloadValidationReport';
import useSblAuth from 'api/useSblAuth';
import { AlertFieldLevel, Button } from 'design-system-react';
import type { FilingPeriodType } from 'types/filingTypes';

interface DownloadValidationReportButtonLimitProperties {
  lei: string;
  submissionId: number;
  filingPeriod: FilingPeriodType;
}

function DownloadValidationReportButton({
  lei,
  filingPeriod,
  submissionId,
}: DownloadValidationReportButtonLimitProperties): JSX.Element {
  const auth = useSblAuth();
  const onHandleDownloadClick = async (): Promise<void> => {
    await downloadValidationReport({ auth, lei, filingPeriod, submissionId });
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Button onClick={onHandleDownloadClick} label='Download report' asLink />
  );
}

interface FilingErrorsWarningsLimitProperties {
  isWarning?: boolean;
}

function FilingErrorsWarningsLimit({
  isWarning,
  lei,
  filingPeriod,
  submissionId,
}: DownloadValidationReportButtonLimitProperties &
  FilingErrorsWarningsLimitProperties): JSX.Element {
  return (
    <div className='my-[1.875rem] max-w-[41.875rem]'>
      <AlertFieldLevel
        message={
          isWarning ? (
            <>
              The number of warnings for this validation exceeds the display
              limit.{' '}
              <DownloadValidationReportButton
                {...{ lei, filingPeriod, submissionId }}
              />{' '}
              to see the full list of warnings.
            </>
          ) : (
            <>
              The number of errors for this validation exceeds the display
              limit.{' '}
              <DownloadValidationReportButton
                {...{ lei, filingPeriod, submissionId }}
              />{' '}
              to see the full list of logic errors and warnings.
            </>
          )
        }
        status='warning'
      />
    </div>
  );
}

FilingErrorsWarningsLimit.defaultProps = {
  isWarning: false,
};

export default FilingErrorsWarningsLimit;
