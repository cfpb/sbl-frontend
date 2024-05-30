/* eslint-disable unicorn/filename-case */
import { mailApiClient, request } from 'api/axiosService';
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

type FinalUserProfileFiObjectType = Record<string, string> & {
  additional_details?: string;
};

const submitUserProfileFi = async (
  auth: SblAuthProperties,
  formFieldsObject: ValidationSchemaCPF,
): Promise<null> => {
  const finalUserProfileFiObject: FinalUserProfileFiObjectType = {
    ...formatformFieldsObject(formFieldsObject.financialInstitutions),
    ...(formFieldsObject.additional_details
      ? { additional_details: formFieldsObject.additional_details }
      : undefined),
  };

  return request<URLSearchParams, null>({
    axiosInstance: mailApiClient,
    url: `/send`,
    method: 'post',
    // ex: 'userName=test%40gmail.com&password=Password%21&grant_type=password'
    data: new URLSearchParams(finalUserProfileFiObject),
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'case-type': caseTypes.CompleteUserProfile satisfies CaseType,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export default submitUserProfileFi;
