interface FiDataType {
  bankName: string;
  leiID: string;
  agencyCode: number;
}

const fiData: FiDataType[] = [
  {
    bankName: "Suntrust Banks, Inc",
    leiID: "7E1PDLW1JLaTSoBS1Go3",
    agencyCode: 3
  },
  {
    bankName: "JP Morgan, Inc",
    leiID: "8E1ODLE1JLaSVoBS1Bo2",
    agencyCode: 4
  },
    {
    bankName: "Bank of America, Inc",
    leiID: "3E89DLE1JBaLEoBS1Co1",
    agencyCode: 4
  },
];

export type { FiDataType };
export { fiData };

