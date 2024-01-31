import axios from "axios";

const apiClient = axios.create({
  baseURL: "",
  headers: {
    "Content-type": "application/json",
  },
});

interface HeaderType {
  Authorization: string;
}

interface RequestType {
  url: string;
  method: string;
  body?: object;
  headers: HeaderType;
};

export const request = async <T, >({ url = '', method = 'get',  body, headers }: RequestType): Promise<T> => {
  const args: any[] = [url];
  if (body) args.push(body);
  if (headers) args.push({
    headers: headers
  });
  const response = await apiClient[method]<T>(...args);
  return response.data;
}