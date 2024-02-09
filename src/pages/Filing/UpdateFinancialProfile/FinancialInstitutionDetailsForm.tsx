/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import FinancialInstitutionDetails, {
  formatDomains,
} from '../ViewInstitutionProfile/FinancialInstitutionDetails';
import type { InstitutionDetailsApiType } from '../ViewInstitutionProfile/institutionDetails.type';

const fields: string[] = [
  'name',
  'hq_address_street_1',
  'hq_address_street_2',
  'hq_address_city',
  'hq_address_state_code',
  'hq_address_zip',
  'lei',
  'is_active',
  'domains',
];

export default function FinancialInstitutionDetailsForm({
  data,
  register,
}: {
  data: InstitutionDetailsApiType;
  register: any;
}): JSXElement {
  return (
    <>
      <FinancialInstitutionDetails data={data} isReview />
      <form>
        {fields.map(field => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const value =
            field === 'domains' ? formatDomains(data[field]) : data[field];

          return (
            <input hidden key={field} value={value} {...register(field)} />
          );
        })}
      </form>
    </>
  );
}
