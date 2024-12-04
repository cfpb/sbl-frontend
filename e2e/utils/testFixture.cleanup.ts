import axios from 'axios';

interface CleanupHealthcheckProperties {
  adminToken: string;
}

export async function cleanupHealthcheck({
  adminToken,
}: CleanupHealthcheckProperties): Promise<boolean> {
  const options = {
    method: 'GET',
    url: `${process.env.SBL_PLAYWRIGHT_TEST_CLEANUP_TARGET}/v1/cleanup/healthcheck`,
    headers: { Authorization: `Bearer ${adminToken}` },
  };

  let result = false;

  try {
    const response = await axios.request(options);
    if (response?.data === 'Service is up.') {
      result = true;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error when calling cleanup api healthcheck :>>', error);
  }

  return result;
}

interface CleanupProperties {
  adminToken: string;
  testLei: string;
}

export default async function cleanup({
  adminToken,
  testLei,
}: CleanupProperties): Promise<void> {
  const options = {
    method: 'DELETE',
    url: `${process.env.SBL_PLAYWRIGHT_TEST_CLEANUP_TARGET}/v1/cleanup/${testLei}`,
    headers: { Authorization: `Bearer ${adminToken}` },
  };

  try {
    await axios.request(options);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('error when calling cleanup api :>>', error);
  }
}
