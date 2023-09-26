import type { FiDataType, FinancialInstitutionRS } from 'pages/ProfileForm/types';

const fiData: FiDataType[] = [
  {
    name: "Fintech 2",
    lei: "7E1PDLW1JLaTSoBS1Go3",
    taxID: "39-0432357",
    agencyCode: 3
  },
  {
    name: "Credit Union 2",
    lei: "8E1ODLE1JLaSVoBS1Bo2",
    taxID: "58-0838387",
    agencyCode: 4
  },
  {
    name: "Bank 2",
    lei: "3E89DLE1JBaLEoBS1Co1",
    taxID: "62-0531257",
    agencyCode: 4
  },
];

const afData: FiDataType[] = [
  {
    name: "Fintech 1",
    lei: "TEST6AFX2TESTXJ89VJ",
    taxID: "03-2345678",
    agencyCode: 3
  },
  {
    name: "Credit Union 1",
    lei: "EX0YWS6AMX2PLE92J1LD",
    taxID: "02-2345678",
    agencyCode: 9
  },
  {
    name: "Bank 1",
    lei: "B90YWS6AFX2LGWOXJ1LD",
    taxID: "01-01234567",
    agencyCode: 9
  },
];


// react-select format
const fiOptions: FinancialInstitutionRS[] = fiData.map(object => ({
  label: object.name,
  value: object.lei,
}));


export default fiData;
export { afData, fiData, fiOptions };

