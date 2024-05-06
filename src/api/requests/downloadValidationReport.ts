import type { SblAuthProperties } from 'api/useSblAuth';
import axios from 'axios';
import type { FilingPeriodType } from 'types/filingTypes';

export interface DownloadValidationReportProperties {
  auth: SblAuthProperties;
  lei: string;
  filingPeriod: FilingPeriodType;
}

export const downloadValidationReport = async ({
  auth,
  lei,
  filingPeriod,
}: DownloadValidationReportProperties): Promise<void> => {
  try {
    await axios({
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
      url: `/v1/filing/institutions/${lei}/filings/${filingPeriod}/submissions/latest/report`,
      method: 'GET',
      responseType: 'blob',
    }).then(response => {
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'text/csv;charset=utf-8' }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${lei}-${filingPeriod}-validation_report.csv`,
      );
      document.body.append(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      link.remove();
      URL.revokeObjectURL(url);
    });
  } catch (error) {
    console.log(error);
  }
};

export default downloadValidationReport;
