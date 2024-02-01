import axios from 'axios';

const apiClient = axios.create({
  baseURL: '',
  headers: {
    'Content-type': 'application/json',
  },
});

export interface HeaderType {
  Authorization: string;
}

export interface RequestType {
  url: string;
  method: string;
  body?: object;
  headers?: HeaderType | undefined;
}

export const request = async <T>({
  url = '',
  method = 'get',
  body,
  headers,
}: RequestType): Promise<T> => {
  const arguments_: any[] = [url];
  if (body) arguments_.push(body);
  if (headers)
    arguments_.push({
      headers,
    });
  const response = await apiClient[method]<T>(...arguments_);
  return response.data;
};
