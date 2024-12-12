import axios from 'axios';

interface CreateDomainAssociationProperties {
  adminToken: string;
  testEmailDomain: string;
  testLei: string;
}

export default async function createDomainAssociation({
  adminToken,
  testEmailDomain,
  testLei,
}: CreateDomainAssociationProperties): Promise<void> {
  const optionsForDomainAssociation = {
    method: 'POST',
    url: `${process.env.SBL_PLAYWRIGHT_TEST_REGTECH_TARGET}/v1/institutions/${testLei}/domains`,
    headers: { Authorization: `Bearer ${adminToken}` },
    data: [{ domain: testEmailDomain }],
  };

  try {
    await axios.request(optionsForDomainAssociation);
  } catch (error) {
    console.error(
      'error when creating a domain/institution association :>>',
      error,
    );
    throw error;
  }
}
