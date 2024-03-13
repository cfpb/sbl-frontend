/* eslint-disable unicorn/filename-case */
import { request } from 'api/axiosService';
import type { CaseType } from 'api/common';
import { caseTypes } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { ValidationSchemaCPF } from 'types/formTypes';
import { One } from 'utils/constants';

const formatformFieldsObject = (
  financialInstitutions: ValidationSchemaCPF['financialInstitutions'],
): Record<string, string> => {
  // eslint-disable-next-line unicorn/no-array-reduce
  return financialInstitutions.reduce((accumulator, inst, index) => {
    return {
      ...accumulator,
      [`lei_${index + One}`]: inst.lei,
      [`name_${index + One}`]: inst.name,
    };
  }, {});
};

const submitUserProfileFi = async (
  auth: SblAuthProperties,
  formFieldsObject: ValidationSchemaCPF,
): Promise<null> => {
  const formattedFinancialInstitutionsObject = formatformFieldsObject(
    formFieldsObject.financialInstitutions,
  );
  return request<null>({
    url: `/send`,
    method: 'post',
    // ex: 'userName=test%40gmail.com&password=Password%21&grant_type=password'
    body: new URLSearchParams(formattedFinancialInstitutionsObject),
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'case-type': caseTypes.CompleteUserProfile satisfies CaseType,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export default submitUserProfileFi;
