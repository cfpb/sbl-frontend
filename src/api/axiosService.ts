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

export const request = async <T, >({ url, method = 'get',  body = null, headers = null }): T => {
  const args = [url];
  if (body) args.push(body);
  if (headers) args.push({
    headers: headers
  });
  const response = await apiClient[method]<T>(...args);
  return response.data;
}