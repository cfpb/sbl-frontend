import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { ReactNode } from 'react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { FinancialInstitutionDetails } from '../ViewInstitutionProfile/FinancialInstitutionDetails';

export default function FinancialInstitutionDetailsForm({
  data,
  description,
}: {
  data: InstitutionDetailsApiType | undefined;
  // eslint-disable-next-line react/require-default-props
  description?: ReactNode;
}): JSXElement {
  return (
    <FinancialInstitutionDetails
      heading='Financial institution details'
      data={data}
      description={description}
    />
  );
}
