import { webcrypto } from 'node:crypto';

export const expectedNoAssociationsUrl =
  /\/profile\/complete\/no-associations$/; // $ = ends with
export const expectedWithAssociationsUrl =
  /\/profile\/complete\/with-associations$/; // $ = ends with

export const expectedPrivacyNoticeUrl = /\/privacy-notice$/; // $ = ends with
export const expectedPaperworkReductionActUrl =
  /\/paperwork-reduction-act-notice$/; // $ = ends with

export interface Account {
  testUsername: string;
  testUserPassword: string;
  testFirstName: string;
  testLastName: string;
  testEmailDomain: string;
  testUserEmail: string;
  testInstitutionName: string;
  testLei: string;
  testTaxId: string;
  testRssdId: string;
}

export const getTestDataObject = (): Account => {
  // generate a 10 integer string as a seed for the test data
  const seed = webcrypto
    .getRandomValues(new Uint32Array(1))[0]
    .toString()
    .padStart(10, '0');
  const testUsername = `playwright-test-user-${seed}`;
  const testFirstName = 'Playwright';
  const testLastName = `Test User ${seed}`;
  const testEmailDomain = `${seed}.gov`;
  const testUserEmail = `playwright-test-user-${seed}@${testEmailDomain}`;
  const testUserPassword = `playwright-test-user-${seed}-password`;
  const testInstitutionName = `RegTech Regional Reserve - ${seed}`;
  const testLei = `${seed.slice(-6)}E2ETESTACCT053`;
  const testTaxId = `${seed.slice(4, 6)}-${seed.slice(-7)}`;
  const testRssdId = seed.slice(-7);
  // eslint-enable @typescript-eslint/no-magic-numbers

  return {
    testUsername,
    testFirstName,
    testLastName,
    testEmailDomain,
    testUserEmail,
    testUserPassword,
    testInstitutionName,
    testLei,
    testTaxId,
    testRssdId,
  };
};
