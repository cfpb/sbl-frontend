import type { FiDataType } from 'pages/ProfileForm/types';

const fiData: FiDataType[] = [
  {
    name: "Generic Financial Institution 1",
    lei: "7E1PDLW1JLaTSoBS1Go3",
    taxID: "39-0432357",
    agencyCode: 3
  },
  {
    name: "Generic Financial Institution 2",
    lei: "8E1ODLE1JLaSVoBS1Bo2",
    taxID: "58-0838387",
    agencyCode: 4
  },
  {
    name: "Generic Financial Institution 3",
    lei: "3E89DLE1JBaLEoBS1Co1",
    taxID: "62-0531257",
    agencyCode: 4
  },
];

const afData: FiDataType[] = [
  {
    name: "Associated Financial Institution 1",
    lei: "8E1PDLW1JLaTSoMS1Go3",
    taxID: "40-0432357",
    agencyCode: 2
  },
  {
    name: "Associated Financial Institution 2",
    lei: "9E1ODWE1JLaSVoBS1Bo2",
    taxID: "68-0838387",
    agencyCode: 6
  },
  {
    name: "Associated Financial Institution 3",
    lei: "9E89DLE1JBaLVoBS1Co1",
    taxID: "82-0531257",
    agencyCode: 7
  },
];


export default fiData;
export { fiData, afData };

