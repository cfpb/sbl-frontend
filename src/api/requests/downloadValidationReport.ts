import { FILING_URL } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { AxiosProgressEvent } from 'axios';
import axios from 'axios';
import type { FilingPeriodType } from 'types/filingTypes';
import { Hundred } from 'utils/constants';

export interface DownloadValidationReportProperties {
  auth: SblAuthProperties;
  lei: string;
  submissionId: number;
  filingPeriod: FilingPeriodType;
  afterDownloadCallback?: () => void;
}

export const downloadValidationReport = async ({
  auth,
  lei,
  filingPeriod,
  submissionId,
  afterDownloadCallback,
}: DownloadValidationReportProperties): Promise<void> => {
  try {
    await axios({
      baseURL: FILING_URL,
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
      url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/${submissionId}/report`,
      method: 'GET',
      responseType: 'blob',
      onDownloadProgress: (progressEvent: AxiosProgressEvent): void => {
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
    }).then(response => {
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'text/csv;charset=utf-8' }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${lei}_${filingPeriod}_${submissionId}_validation_report.csv`,
      );
      document.body.append(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      link.remove();
      URL.revokeObjectURL(url);
    });
  } catch (error) {
    console.error(error);
  } finally {
    if (afterDownloadCallback) afterDownloadCallback();
  }
};

export default downloadValidationReport;
