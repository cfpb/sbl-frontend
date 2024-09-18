import * as fs from 'node:fs';
import * as path from 'node:path';

async function globalTeardown() {
  const downloadDirectory = path.resolve(
    __dirname,
    'e2e/pages/filing-app/uploadFile/downloads',
  );

  // Check if the directory exists and delete it
  if (fs.existsSync(downloadDirectory)) {
    fs.rmSync(downloadDirectory, { recursive: true, force: true });
    console.log(`Deleted the directory: ${downloadDirectory}`);
  } else {
    console.log(`Directory not found: ${downloadDirectory}`);
  }
}

export default globalTeardown;
