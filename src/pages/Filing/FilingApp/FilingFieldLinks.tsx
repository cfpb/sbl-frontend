import downloadValidationReport from 'api/requests/downloadValidationReport';
import useSblAuth from 'api/useSblAuth';
import { Link } from 'components/Link';
import { Button, Paragraph } from 'design-system-react';
import { useCallback, useState } from 'react';
import type { FilingPeriodType } from 'types/filingTypes';

interface FilingFieldLinksProperties {
  id: string;
  lei: string;
  submissionId: number;
  filingPeriod: FilingPeriodType;
}

function FilingFieldLinks({
  lei,
  filingPeriod,
  id,
  submissionId,
  className,
  ...others
}: FilingFieldLinksProperties & JSX.IntrinsicElements['div']): JSX.Element {
  // download in-progress state
  const [downloadInProgress, setDownloadInProgress] = useState<boolean>(false);
  const auth = useSblAuth();

  const afterDownloadCallback = useCallback(
    () => setDownloadInProgress(false),
    [],
  );

  const onHandleDownloadClick = async (): Promise<void> => {
    setDownloadInProgress(true);
    await downloadValidationReport({
      auth,
      lei,
      filingPeriod,
      submissionId,
      afterDownloadCallback,
    });
  };
  return (
    <div id={id} className={`mt-[1.875rem] ${className}`} {...others}>
      <div className='flex items-center gap-[0.9375rem]'>
        <Button
          label='Download report'
          id='download-validation-report-button'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={onHandleDownloadClick}
          iconRight={downloadInProgress ? 'updating' : 'download'}
        />
        <Paragraph>
          <Link
            className='font-medium'
            href={`/filing/${filingPeriod}/${lei}/upload`}
          >
            Upload a new file
          </Link>
        </Paragraph>
      </div>
    </div>
  );
}

export default FilingFieldLinks;
