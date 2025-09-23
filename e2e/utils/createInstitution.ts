import axios from 'axios';

interface CreateInstitutionProperties {
  adminToken: string;
  testInstitutionName: string;
  testLei: string;
  testTaxId: string;
  testRssdId: string;
}

// disabled for test data
// eslint-disable @typescript-eslint/no-magic-numbers unicorn/numeric-separators-style
export const generateInstitutionData = (data: CreateInstitutionProperties) => ({
  lei: data.testLei,
  name: data.testInstitutionName,
  tax_id: data.testTaxId,
  rssd_id: data.testRssdId,
  lei_status_code: 'ISSUED',
  primary_federal_regulator_id: 'OCC',
  hmda_institution_type_id: '1',
  hq_address_street_1: 'Test Address Street 1',
  hq_address_street_2: '',
  hq_address_street_3: '',
  hq_address_street_4: '',
  hq_address_city: 'Test City 1',
  hq_address_state_code: 'GA',
  hq_address_zip: '00000',
  parent_lei: '012PARENTTESTBANK127',
  parent_legal_name: 'PARENT TEST BANK 127',
  parent_rssd_id: 12_745,
  top_holder_lei: '01274TOPHOLDERLEI123',
  top_holder_legal_name: 'TOP HOLDER LEI 123',
  top_holder_rssd_id: 123_456,
});
// eslint-enable @typescript-eslint/no-magic-numbers unicorn/numeric-separators-style

// Allow developers to disable routing in development
export default async function createInstitution({
  adminToken,
  testInstitutionName,
  testTaxId,
  testLei,
  testRssdId,
}: CreateInstitutionProperties): Promise<void> {
  const options = {
    method: 'POST',
    url: `${process.env.SBL_PLAYWRIGHT_TEST_REGTECH_TARGET}/v1/institutions`,
    headers: { Authorization: `Bearer ${adminToken}` },
    data: generateInstitutionData({
      adminToken,
      testInstitutionName,
      testTaxId,
      testLei,
      testRssdId,
    }),
  };

  try {
    await axios.request(options);
  } catch (error) {
    console.error('error when creating institutions :>>', error);
    throw error;
  }
}
