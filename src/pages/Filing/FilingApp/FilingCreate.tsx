import AlertApiUnavailable from 'components/AlertApiUnavailable';
import { LoadingContent } from 'components/Loading';
import { Button } from 'design-system-react';
import { useNavigate, useParams } from 'react-router-dom';
import useCreateFiling from 'utils/useCreateFiling';

// TODO: Move to constants file?
const STATUS_CODE_INSTITUTION_EXISTS = 409;

export function FilingCreate(): JSX.Element | null | undefined {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  // TODO: Don't create filing if lei or filingPeriod are missing
  // TODO: Send user back to /filing if lei or filingPeriod are missing
  const { isLoading, error, data: filing } = useCreateFiling(lei, year);

  if (isLoading) return <LoadingContent message='Loading filing data...' />;

  // Filing exists
  if (
    filing ??
    Number(error?.response?.status) === STATUS_CODE_INSTITUTION_EXISTS
  ) {
    // TODO: React complaining about setState during render.
    //       I think there is a <Redirect> component I can use for this
    navigate(`/filing/${year}/${lei}/upload`);
    return null;
  }

  if (error)
    return (
      <div className='u-mt45 u-mb45 mx-3'>
        <AlertApiUnavailable
          message={`Unable to create a ${year} Filing for ${lei}`}
        />
        <div>
          <Button
            label='Return to Filing overview'
            onClick={() => navigate('/filing')} // TODO: Make an onGoToFilingOverview function
          />
        </div>
      </div>
    );
}

export default FilingCreate;
