import { mailApiClient, request } from 'api/axiosService';
import type { CaseType } from 'api/common';
import { caseTypes } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { UpdateInstitutionType } from 'pages/Filing/UpdateFinancialProfile/types';
import { checkboxOptions } from 'pages/Filing/UpdateFinancialProfile/types';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { One } from 'utils/constants';

type ChangedDataType = Record<string, string>;

// Determine if Type selections or Other description have changed
export const hasInstitutionTypeChanged = (
  formTypes: UpdateInstitutionType['sbl_institution_types'],
  apiTypes: InstitutionDetailsApiType['sbl_institution_types'],
  formOtherDetails: UpdateInstitutionType['sbl_institution_types_other'],
): boolean => {
  // Existing data from API
  const previousTypes = apiTypes.map(index => index.sbl_type.id).sort();
  const previousOther =
    apiTypes.find(index => index.sbl_type.id === '13')?.details ?? '';

  // Form data
  // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
  const currentTypes = formTypes
    .map((value, index) => value && String(index))
    .filter(Boolean)
    .sort();
  const currentOther = formOtherDetails ?? '';

  // Compare
  if (previousTypes.toString() !== currentTypes.toString()) return true;
  if (previousOther.localeCompare(currentOther) !== 0) return true;
  return false;
};

/*
 * Compares current form data against API values
 *  If no data has changed, returns undefined
 *  If data changes found, returns Object with changed fields
 */
export const collectChangedData = (
  formData: UpdateInstitutionType,
  changedFields: Record<string, boolean | object | undefined>,
  data: InstitutionDetailsApiType,
): ChangedDataType | undefined => {
  const result: ChangedDataType = {};

  // Include only fields which have been identified as "changed"
  for (const key of Object.keys(changedFields)) {
    result[key] = formData[key as keyof UpdateInstitutionType] as string;
  }

  // Institution types are not registered as "changed" by react-hook-form (because they're in an array?), so we have to manually process them.
  if (
    hasInstitutionTypeChanged(
      formData.sbl_institution_types,
      data.sbl_institution_types,
      formData.sbl_institution_types_other,
    )
  ) {
    const sblInstitutionTypes = [];
    for (const key of formData.sbl_institution_types.keys()) {
      if (formData.sbl_institution_types[key]) {
        const indexToTypeArray = Number(key) - One;
        sblInstitutionTypes.push(checkboxOptions[indexToTypeArray].label);
      }
    }

    result.sbl_institution_types = sblInstitutionTypes.join(', ');

    if (sblInstitutionTypes.includes('Other'))
      result.sbl_institution_types += ` (${formData.sbl_institution_types_other})`;
  }

  // TODO: additional_details is not registering as "changed" (due to ref forwarding issue?), need to manually process them.
  if ((formData.additional_details ?? '').length > 0)
    result.additional_details = formData.additional_details as string;

  if (Object.keys(result).length === 0) return;

  // Has changed data
  result.Note = 'This data reflects the institution data that has been changed';

  // eslint-disable-next-line consistent-return
  return result;
};

const submitUpdateFinancialProfile = async (
  auth: SblAuthProperties,
  financialProfileObject: Record<string, string>,
): Promise<null> => {
  return request<URLSearchParams, null>({
    axiosInstance: mailApiClient,
    url: `/send`,
    method: 'post',
    // ex: 'userName=test%40gmail.com&password=Password%21&grant_type=password'
    data: new URLSearchParams(financialProfileObject),
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'case-type': caseTypes.UpdateFinancialProfile satisfies CaseType,
    },
  });
};

export default submitUpdateFinancialProfile;
