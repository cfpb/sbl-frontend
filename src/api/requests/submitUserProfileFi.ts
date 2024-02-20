/* eslint-disable unicorn/filename-case */
import { request } from 'api/axiosService';
import { emailSubjects } from 'api/common';
import type { SblAuthProperties } from 'api/useSblAuth';

const submitUserProfileFi = async (
  auth: SblAuthProperties,
  formFieldsObject: Record<string, string>,
  name: string,
): Promise<null> => {
  return request<null>({
    // TODO: wait for backend team to set this path in the API design
    url: `/send`,
    method: 'post',
    // ex: 'userName=test%40gmail.com&password=Password%21&grant_type=password'
    body: new URLSearchParams(formFieldsObject),
    headers: {
      Authorization: `Bearer ${auth.user?.access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Mail-Subject': emailSubjects.CompleteUserProfile,
      'X-Mail-Sender-Address': auth.user?.profile.email,
      'X-Mail-Sender-Name': `${name}`,
    },
  });
};

export default submitUserProfileFi;
