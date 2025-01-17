import type {
  Page,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestType,
} from '@playwright/test';
import { expect } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';

const downloadPath = path.resolve(__dirname, 'downloads');
let downloadFilePath: string;

export interface DownloadableReportInterface {
  testUsed: TestType<
    PlaywrightTestArgs & PlaywrightTestOptions,
    PlaywrightWorkerArgs & PlaywrightWorkerOptions
  >;
  pageUsed: Page;
}

export async function verifyDownloadableReport({
  testUsed,
  pageUsed,
}: DownloadableReportInterface): Promise<void> {
  await testUsed.step('Verify downloadable report', async () => {
    // Set up listener for the download event
    const downloadPromise = pageUsed.waitForEvent('download');
    await pageUsed.getByRole('button', { name: 'Download report' }).click();
    const download = await downloadPromise;

    // Save downloaded file to the specified location
    downloadFilePath = path.join(
      downloadPath,
      await download.suggestedFilename(),
    );
    await download.saveAs(downloadFilePath);

    // Wait for the download to complete
    await download.path();

    // Verify the file exists
    expect(fs.existsSync(downloadFilePath)).toBeTruthy();

    // Verify the file is not empty
    const fileSize = fs.statSync(downloadFilePath).size;
    expect(fileSize).toBeGreaterThan(0);

    // eslint-disable-next-line no-console
    console.log(`Downloaded file path: ${downloadFilePath}`);

    // Cleanup Test File
    try {
      // Small delay to ensure the test is fully complete
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });

      // Delete the downloaded file if it exists
      if (downloadFilePath && fs.existsSync(downloadFilePath)) {
        fs.unlinkSync(downloadFilePath);
        // eslint-disable-next-line no-console
        console.log(`Deleted the downloaded file: ${downloadFilePath}`);
      }
    } catch (error) {
      console.error(
        `Failed to delete file: ${downloadFilePath}. Error: ${
          (error as Error).message
        }`,
      );
    }
  });
}

export default verifyDownloadableReport;
