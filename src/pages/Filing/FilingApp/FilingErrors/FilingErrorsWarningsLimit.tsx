import { AlertFieldLevel, Button } from 'design-system-react';
import { Thousand } from 'utils/constants';

const onHandleDownloadClick = (): void => {
  const element = document.querySelector(
    `#download-validation-report-button`,
  ) as HTMLElement | undefined;
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
    setTimeout(() => element.focus(), Thousand);
  }
};

function DownloadValidationReportButton(): JSX.Element {
  return (
    <Button onClick={onHandleDownloadClick} label='Download report' asLink />
  );
}

interface FilingErrorsWarningsLimitProperties {
  isWarning?: boolean;
}

function FilingErrorsWarningsLimit({
  isWarning,
}: FilingErrorsWarningsLimitProperties): JSX.Element {
  return (
    <div className='my-[1.875rem] max-w-[41.875rem]'>
      <AlertFieldLevel
        message={
          isWarning ? (
            <>
              The number of warnings for this validation exceeds the display
              limit. <DownloadValidationReportButton /> to see the full list of
              warnings.
            </>
          ) : (
            <>
              The number of errors for this validation exceeds the display
              limit. <DownloadValidationReportButton /> to see the full list of
              logic errors and warnings.
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
