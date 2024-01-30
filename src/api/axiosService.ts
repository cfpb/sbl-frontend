import axios from "axios";
import { SubmitUserProfileObject } from 'api/common';

import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';
import type { UserProfileObject } from 'api/oidc';
import type { AuthContextProps } from 'react-oidc-context';

const apiClient = axios.create({
  baseURL: "",
  headers: {
    "Content-type": "application/json",
  },
});

const request = async <T, >({ url, method = 'get',  body = null, headers = null }): T => {
  const args = [url];
  if (body) args.push(body);
  if (headers) args.push({
    headers: headers
  });
  const response = await apiClient[method]<T>(...args);
  return response.data;
}

export const fetchInstitutionDetails = async (auth: SblAuthProperties, lei: string | undefined) => {
  return await request<InstitutionDetailsApiType>({ 
    url: `/v1/institutions/${lei}`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export const fetchAssociatedInstitutions = async (auth: SblAuthProperties) => {
  return await request<InstitutionDetailsApiType[]>({ 
    url: `/v1/institutions/associated`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export const fetchInstitutions = async (auth: SblAuthProperties, domain?: string) => {
  return await request<InstitutionDetailsApiType[]>({ 
    url: `/v1/institutions${domain ? `?domain=${domain}` : '' }`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export const fetchIsDomainAllowed = async (auth: SblAuthProperties, domain?: string) => {
  return await request<boolean>({ 
    url: `/v1/institutions${domain ? `?domain=${domain}` : '' }`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export const fetchUserProfile = async (auth: AuthContextProps) => {
  return await request<boolean>({ 
    url: `/v1/admin/me/`,
    method: 'get',
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export const submitUserProfile = async (auth: SblAuthProperties, userProfileObject: SubmitUserProfileObject) => {
  return await request<null>({ 
    url: `/v1/admin/me/`,
    method: 'put',
    body: userProfileObject,
    headers: { Authorization: `Bearer ${auth.user?.access_token}` }
    });
}

export default {
  fetchInstitutionDetails,
  fetchAssociatedInstitutions,
  fetchInstitutions,
  fetchIsDomainAllowed,
  fetchUserProfile,
  submitUserProfile
};