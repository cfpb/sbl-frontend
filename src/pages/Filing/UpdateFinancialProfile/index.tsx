import { useQuery } from '@tanstack/react-query';
import { fetchInstitutionDetails } from 'api/requests';
import useSblAuth from 'api/useSblAuth';
import { LoadingContent } from 'components/Loading';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import { useError500 } from 'pages/Error/Error500';
import { useParams } from 'react-router-dom';
import UFPForm from './UfpForm';
import './updateFinancialProfile.less';

// TODO: Decide on properties to inherit
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Properties {}

// TODO: Decide on properties to use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function UpdateFinancialProfile(properties: Properties): JSXElement {
  const auth = useSblAuth();
  const { lei } = useParams();
  const redirect500 = useError500();

  const { isLoading, isError, data } = useQuery(
    [`institution-details-${lei}`],
    async () => fetchInstitutionDetails(auth, lei),
  );

  if (isLoading) return <LoadingContent />;
  if (isError)
    return redirect500({
      message: 'Unable to fetch institution details.',
    });

  return <UFPForm {...{ data }} />;
}

export default UpdateFinancialProfile;
