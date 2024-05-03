import downloadValidationReport from 'api/requests/downloadValidationReport';
import useSblAuth from 'api/useSblAuth';
import { ListLink } from 'components/Link';
import { Button, List } from 'design-system-react';
import type { FilingPeriodType } from 'types/filingTypes';

interface FilingFieldLinksProperties {
  id: string;
  lei: string;
  filingPeriod: FilingPeriodType;
}

function FilingFieldLinks({
  lei,
  filingPeriod,
  id,
  className,
  ...others
}: FilingFieldLinksProperties & JSX.IntrinsicElements['div']): JSX.Element {
  const auth = useSblAuth();

  const onHandleDownloadClick = async (): Promise<void> => {
    await downloadValidationReport({ auth, lei, filingPeriod });
  };
  return (
    <div id={id} className={`mt-[1.875rem] ${className}`} {...others}>
      <List isLinks>
        <Button
          asLink
          className='m-list_link mb-2'
          label='Download validation report'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={onHandleDownloadClick}
        />
        <ListLink href={`/filing/${filingPeriod}/${lei}/upload`}>
          Upload a new file
        </ListLink>
      </List>
    </div>
  );
}

export default FilingFieldLinks;
