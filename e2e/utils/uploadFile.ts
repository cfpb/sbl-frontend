import type {
  Page,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestType,
} from '@playwright/test';
import { expect } from '@playwright/test';
import path from 'node:path';

export const ResultUploadMessage = {
  syntax: 'Errors were found in your file',
  logic: 'Errors were found in your file',
  warning: 'Warnings were found in your file',
} as const;

export type ResultUploadMessageType = typeof ResultUploadMessage;
export type ResultUploadMessageKeys = keyof typeof ResultUploadMessage;
export type ResultUploadMessageValues =
  (typeof ResultUploadMessage)[ResultUploadMessageKeys];

export interface UploadFileInterface {
  testUsed: TestType<
    PlaywrightTestArgs & PlaywrightTestOptions,
    PlaywrightWorkerArgs & PlaywrightWorkerOptions
  >;
  pageUsed: Page;
  newUpload: boolean;
  testTitle: string;
  filePath: string;
  resultMessage: ResultUploadMessageValues;
}

export async function uploadFile({
  testUsed,
  pageUsed,
  newUpload,
  testTitle,
  filePath,
  resultMessage,
}: UploadFileInterface): Promise<void> {
  await testUsed.step(testTitle, async () => {
    await expect(pageUsed.locator('h2')).toContainText(
      'Select a file to upload',
    );
    const fileChooserPromise = pageUsed.waitForEvent('filechooser');
    await (newUpload
      ? pageUsed.getByLabel('Select a .csv file to upload').click()
      : pageUsed
          .getByLabel('Replace your previously uploaded .csv file')
          .click());
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, filePath));
    await expect(pageUsed.getByText('File upload in progress')).toBeVisible();
    await expect(pageUsed.getByText('File upload successful')).toBeVisible();
    await expect(
      pageUsed.getByText('Validation checks in progress'),
    ).toBeVisible();
    await expect(pageUsed.getByText(resultMessage)).toBeVisible();
  });
}

export default uploadFile;
