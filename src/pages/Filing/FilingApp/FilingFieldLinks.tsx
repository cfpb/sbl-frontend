import downloadValidationReport from 'api/requests/downloadValidationReport';
import useSblAuth from 'api/useSblAuth';
import Button from 'components/Button';
import { List, ListItem } from 'design-system-react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const onHandleDownloadClick = async (): Promise<void> => {
    await downloadValidationReport({ auth, lei, filingPeriod, submissionId });
  };

  const onUploadNewFile = (): void =>
    navigate(`/filing/${filingPeriod}/${lei}/upload`);

  return (
    <div id={id} className={`mt-[1.875rem] ${className}`} {...others}>
      <List className='flex items-center gap-[0.9375rem]' isLinks>
        <ListItem>
          <Button
            label='Download report'
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={onHandleDownloadClick}
          />
        </ListItem>
        <ListItem>
          {/* 
            TODO: Replace button used as link - I couldn't get the button-like-styling right
            https://github.com/cfpb/sbl-frontend/issues/575
           */}
          <Button
            appearance='secondary'
            label='Upload a new file'
            className='mb-[0.5rem]'
            onClick={onUploadNewFile}
          />
        </ListItem>
      </List>
    </div>
  );
}

export default FilingFieldLinks;
