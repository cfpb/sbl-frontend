import { useQuery } from '@tanstack/react-query';
import { fetchInstitutionDetails } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import { LoadingContent } from 'components/Loading';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import { useParams } from 'react-router-dom';
import UFPForm from './UfpForm';
import './updateFinancialProfile.less';

function UpdateFinancialProfile(): JSXElement {
  const auth = useSblAuth();
  const { lei } = useParams();

  const { isLoading, isError, data } = useQuery(
    [`institution-details-${lei}`],
    async () => fetchInstitutionDetails(auth, lei),
  );

  if (isLoading) return <LoadingContent />;

  return <UFPForm {...{ data, isError }} />;
}

export default UpdateFinancialProfile;
