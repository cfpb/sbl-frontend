import { filingApiClient, request } from 'api/axiosService';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { AxiosProgressEvent } from 'axios';
import type { FilingPeriodType, SubmissionResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { Hundred } from 'utils/constants';

const uploadCsvAxios = async (
  auth: SblAuthProperties,
  file: File,
  lei: InstitutionDetailsApiType['lei'],
  period_code: FilingPeriodType,
  // eslint-disable-next-line @typescript-eslint/max-params
): Promise<SubmissionResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return request<FormData, SubmissionResponse>({
    axiosInstance: filingApiClient,
    url: `/v1/filing/institutions/${lei}/filings/${period_code}/submissions`,
    method: 'post',
    data: formData,
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'Content-Type': 'multipart/form-data',
    },
    options: {
      onUploadProgress: (progressEvent: AxiosProgressEvent): void => {
        if (
          typeof progressEvent.total === 'number' &&
          typeof progressEvent.loaded === 'number'
        ) {
          // Keep incase we decide to use a progress bar
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const percentCompleted = Math.round(
            (progressEvent.loaded * Hundred) / progressEvent.total,
          );
        }
      },
    },
  });
};

export default uploadCsvAxios;
