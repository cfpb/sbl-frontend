import axios from "axios";
import type { SblAuthProperties } from 'api/useSblAuth';
import type { InstitutionDetailsApiType } from 'pages/Filing/InstitutionDetails/institutionDetails.type';

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

export default {
  fetchInstitutionDetails
};