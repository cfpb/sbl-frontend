import downloadValidationReport from 'api/requests/downloadValidationReport';
import useSblAuth from 'api/useSblAuth';
import { Link } from 'components/Link';
import { Button, Paragraph } from 'design-system-react';
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
  const auth = useSblAuth();

  const onHandleDownloadClick = async (): Promise<void> => {
    await downloadValidationReport({ auth, lei, filingPeriod, submissionId });
  };
  return (
    <div id={id} className={`mt-[1.875rem] ${className}`} {...others}>
      <div className='flex items-center gap-[0.9375rem]'>
        <Button
          label='Download report'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={onHandleDownloadClick}
          iconRight='download'
        />
        <Paragraph>
          <Link href={`/filing/${filingPeriod}/${lei}/upload`}>
            Upload a new file
          </Link>
        </Paragraph>
      </div>
    </div>
  );
}

export default FilingFieldLinks;
