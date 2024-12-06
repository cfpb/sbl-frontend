const InstitutionDataLabels = {
  emailDomains: 'Email domain(s)',
  fiName: 'Financial institution name',
  fiType: 'Type of financial institution',
  hqAddress: 'Headquarters address',
  lei: 'Legal Entity Identifier (LEI)',
  leiStatus: 'LEI registration status',
  name: 'Name',
  regName: 'Federal prudential regulator',
  rssd: 'Research, Statistics, Supervision, Discount Identification (RSSD ID) number',
  tin: 'Federal Taxpayer Identification Number (TIN)',
};

export const InstitutionHelperText = {
  rssd: 'RSSD ID must be a number.',
  tin: 'TIN must be 2 digits, followed by a dash, followed by 7 digits.',
  lei: 'LEI must be 20 characters and contain only A-Z and 0-9 (no special characters).',
};

export default InstitutionDataLabels;
