import axios from 'axios';

interface CleanupProperties {
  adminToken: string;
  testLei: string;
}

// Allow developers to disable routing in development
export default async function cleanup({
  adminToken,
  testLei,
}: CleanupProperties): Promise<void> {
  // disabled for test data
  // eslint-disable @typescript-eslint/no-magic-numbers unicorn/numeric-separators-style
  const options = {
    method: 'DELETE',
    url: `${process.env.SBL_PLAYWRIGHT_TEST_CLEANUP_TARGET}/v1/cleanup/${testLei}`,
    headers: { Authorization: `Bearer ${adminToken}` },
    // eslint-enable @typescript-eslint/no-magic-numbers unicorn/numeric-separators-style
  };

  try {
    await axios.request(options);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error when calling cleanup api :>>', error);
    throw error;
  }
}
