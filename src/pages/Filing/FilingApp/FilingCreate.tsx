import AlertApiUnavailable from 'components/AlertApiUnavailable';
import { LoadingContent } from 'components/Loading';
import { Button } from 'design-system-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FILING_STATUS_CODE_FILING_EXISTS } from 'utils/constants';
import useCreateFiling from 'utils/useCreateFiling';

export function FilingCreate(): JSX.Element | null | undefined {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, data: filing } = useCreateFiling(lei, year);

  /** Missing required param, cannot continue */
  if (!lei || !year) {
    return <Navigate to='/filing/' />;
  }

  if (isLoading) return <LoadingContent message='Loading filing data...' />;

  /** Filing exists */
  if (
    filing ??
    Number(error?.response?.status) === FILING_STATUS_CODE_FILING_EXISTS
  ) {
    return <Navigate to={`/filing/${year}/${lei}/upload`} />;
  }

  const onReturnToFiling = (): void => navigate('/filing');

  if (error)
    return (
      <div className='u-mt45 u-mb45 mx-3'>
        <AlertApiUnavailable
          message={`Unable to create a ${year} Filing for ${lei}`}
        />
        <div>
          <Button label='Return to Filing home' onClick={onReturnToFiling} />
        </div>
      </div>
    );
}

export default FilingCreate;
