import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { FinancialInstitutionDetails } from '../ViewInstitutionProfile/FinancialInstitutionDetails';

export default function FinancialInstitutionDetailsForm({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSXElement {
  return (
    <FinancialInstitutionDetails
      heading='Review your financial institution details'
      data={data}
    />
  );
}
