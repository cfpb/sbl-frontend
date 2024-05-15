import AlertApiUnavailable from 'components/AlertApiUnavailable';
import { LoadingContent } from 'components/Loading';
import { Button } from 'design-system-react';
import { useNavigate, useParams } from 'react-router-dom';
import { FILING_STATUS_CODE_FILING_EXISTS } from 'utils/constants';
import useCreateFiling from 'utils/useCreateFiling';

export function FilingCreate(): JSX.Element | null | undefined {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, data: filing } = useCreateFiling(lei, year);

  /** Missing required param, cannot continue */
  if (!lei || !year) {
    navigate('/filing');
    return null;
  }

  if (isLoading) return <LoadingContent message='Loading filing data...' />;

  /** Filing exists */
  if (
    filing ??
    Number(error?.response?.status) === FILING_STATUS_CODE_FILING_EXISTS
  ) {
    // Note: React was complaining about setState during render. This setTimeout seems to resolve the issue.
    setTimeout(() => navigate(`/filing/${year}/${lei}/upload`), 0);
    return <LoadingContent message='Loading filing data...' />;
  }

  const onReturnToFiling = (): void => navigate('/filing');

  if (error)
    return (
      <div className='u-mt45 u-mb45 mx-3'>
        <AlertApiUnavailable
          message={`Unable to create a ${year} Filing for ${lei}`}
        />
        <div>
          <Button
            label='Return to Filing overview'
            onClick={onReturnToFiling}
          />
        </div>
      </div>
    );
}

export default FilingCreate;
