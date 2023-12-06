import type { InstitutionDetailsApiType } from './institutionDetails.type';

export const fetchInstitutionDetails =
  async (): Promise<InstitutionDetailsApiType> => {
    const data = {
      name: 'Fintech 1',
      lei: 'TESTS6AFX2TESTXJ89VJ  (Active)',
      domains: ['fintech1.com'],
      tax_id: '03-2345678',
      rssd_id: 'N/A',
      primary_federal_regulator_id:
        'Federal Deposit Insurance Corporation (FDIC)',
      hmda_institution_type_id: '1 - National Bank',
      sbl_institution_type_id: 'Online lender, Equipment finance company',
      hq_address_street_1: '321 Anywhere Street',
      hq_address_street_2: '',
      hq_address_city: 'Anytown',
      hq_address_state: 'AR',
      hq_address_zip: '12312',
      parent_lei: 'PARENTTESTBANK123',
      parent_legal_name: 'PARENT TEST BANK 123',
      parent_rssd_id: '12,345',
      top_holder_lei: 'TOPHOLDERLEI123',
      top_holder_legal_name: 'TOP HOLDER LEI 123',
      top_holder_rssd_id: '123,456',
    };

    return data;
  };

export default fetchInstitutionDetails;
