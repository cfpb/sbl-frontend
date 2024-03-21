import { request } from 'api/axiosService';
import type { CaseType } from 'api/common';
import { MAIL_BASE_URL, caseTypes } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import { checkboxOptions } from 'pages/Filing/UpdateFinancialProfile/types';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { One } from 'utils/constants';

export const collectChangedData = (
  formData: InstitutionDetailsApiType,
  changedFields: Record<string, boolean | undefined>,
): InstitutionDetailsApiType => {
  const result: InstitutionDetailsApiType = {};

  // Include only fields which have been identified as "changed"
  for (const key of Object.keys(changedFields)) {
    result[key] = formData[key] as string;
  }

  // Institution types are not registered as "changed" by react-hook-form (because they're in an array?), so we have to manually process them.
  if (
    formData.sbl_institution_types &&
    typeof formData.sbl_institution_types === 'object'
  ) {
    const sblInstitutionTypes = [];
    for (const key of formData.sbl_institution_types.keys()) {
      if (formData.sbl_institution_types[key]) {
        const indexToTypeArray = Number(key) - One;
        sblInstitutionTypes.push(checkboxOptions[indexToTypeArray].label);
      }
    }

    result.sbl_institution_types = sblInstitutionTypes.join(', ');

    // TODO: Okay to merge 'Other' into this listing?
    if (sblInstitutionTypes.includes('Other'))
      result.sbl_institution_types += ` (${formData.sbl_institution_types_other})`;
  }

  // TODO: additional_details is not registering as "changed" (due to ref forwarding issue?), need to manually process them.
  if ((formData.additional_details ?? '').length > 0)
    result.additional_details = formData.additional_details;

  return result;
};

const submitUpdateFinancialProfile = async (
  auth: SblAuthProperties,
  financialProfileObject: Record<string, string>,
): Promise<null> => {
  return request<null>({
    // TODO: wait for backend team to set this path in the API design
    url: `${MAIL_BASE_URL}/send`,
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
