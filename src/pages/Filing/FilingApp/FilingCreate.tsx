import AlertApiUnavailable from 'components/AlertApiUnavailable';
import { LoadingContent } from 'components/Loading';
import { Button } from 'design-system-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FILING_STATUS_CODE_FILING_EXISTS } from 'utils/constants';
import useCreateFiling from 'utils/useCreateFiling';

export function FilingCreate(): JSX.Element {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  const { isLoading, error, data: filing } = useCreateFiling(lei, year);

  /** Missing required param, cannot continue */
  if (!lei || !year) {
    return <Navigate to='/filing/' />;
  }

  if (isLoading) return <LoadingContent />;

  /** Filing exists */
  if (
    filing ??
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

  return <></>;
}

export default FilingCreate;
