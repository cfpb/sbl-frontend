// @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
import type { FiDataType, FinancialInstitutionRS } from 'types/formTypes';

const fiData: FiDataType[] = [
  {
    name: 'Fintech 2',
    lei: '7E1PDLW1JLaTSoBS1Go3',
    taxID: '39-0432357',
    rssID: '3383821',
  },
  {
    name: 'Credit Union 2',
    lei: '8E1ODLE1JLaSVoBS1Bo2',
    taxID: '58-0838387',
    rssID: '2905184',
  },
  {
    name: 'Bank 2',
    lei: '3E89DLE1JBaLEoBS1Co1',
    taxID: '62-0531257',
    rssID: '7492254',
  },
];

// react-select format
const fiOptions: FinancialInstitutionRS[] = fiData.map(object => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  label: `${object.name} | ${object.lei}`,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  value: object.lei,
}));

export { fiData, fiOptions };
