/* eslint-disable unicorn/filename-case */
import { request } from 'api/axiosService';
import type { EmailSubject } from 'api/common';
import { emailSubjects } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';
import type { ValidationSchemaCPF } from 'pages/ProfileForm/types';
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
      [`rssd_${index + One}`]: inst.rssd_id,
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
      'X-Mail-Subject':
        emailSubjects.CompleteUserProfile satisfies EmailSubject,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export default submitUserProfileFi;
