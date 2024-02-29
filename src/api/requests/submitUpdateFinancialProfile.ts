import { request } from 'api/axiosService';
import type { CaseType } from 'api/common';
import { caseTypes } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { UFPSchema } from 'pages/Filing/UpdateFinancialProfile/types';

export const formatFinancialProfileObject = (
  formData: UFPSchema,
  changedFields: Record<string, Record<string, boolean> | boolean>,
): Record<string, string> => {
  const result = {};

  // Include fields identified as "changed"
  for (const key of Object.keys(changedFields)) {
    result[key] = formData[key] as string;
  }

  // TODO: Types are not registered as "changed", so we have to manually process them
  // Maybe be due to https://github.com/cfpb/design-system-react/issues/316
  const sblInstitutionTypes = [];
  for (const key of Object.keys(formData.sbl_institution_types)) {
    if (formData.sbl_institution_types[key]) sblInstitutionTypes.push(key);
  }
  result.sbl_institution_types = sblInstitutionTypes.join(',');
  if (sblInstitutionTypes.includes('other'))
    result.sbl_institution_types_other = formData.sbl_institution_types_other;

  // TODO: additional_details is not registering as "changed" due to ref forwarding issue.  Might need to fix this in DSR?
  if (formData.additional_details.length > 0)
    result.additional_details = formData.additional_details;

  return result;
};

const submitUpdateFinancialProfile = async (
  auth: SblAuthProperties,
  financialProfileObject: Record<string, string>,
): Promise<null> => {
  return request<null>({
    url: `/send`,
    method: 'post',
    // ex: 'userName=test%40gmail.com&password=Password%21&grant_type=password'
    body: new URLSearchParams(financialProfileObject),
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'case-type': caseTypes.UpdateFinancialProfile satisfies CaseType,
    },
  });
};

export default submitUpdateFinancialProfile;
