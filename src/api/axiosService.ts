import axios from 'axios';
import type { EmailSubject } from './common';

const apiClient = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface HeaderType {
  Authorization: string;
  'Content-Type'?: string;
}

export interface HeaderTypeEmail {
  'X-Mail-Subject': EmailSubject;
  'X-Mail-Sender-Address': string;
  'X-Mail-Sender-Name'?: string;
}

export type HeaderTypeCombined = HeaderType & HeaderTypeEmail;

type Methods = 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';

export interface RequestType {
  url: string;
  method: Methods;
  body?: object;
  headers?: HeaderType | HeaderTypeCombined;
}

export const request = async <T>({
  url = '',
  method = 'get',
  body,
  headers,
}: RequestType): Promise<T> => {
  const argumentList: RequestType[keyof RequestType][] = [url];
  if (body) argumentList.push(body);
  if (headers)
    argumentList.push({
      headers,
    });
  // @ts-expect-error: A spread argument must either have a tuple type or be passed to a rest parameter.
  const response = await apiClient[method]<T>(...argumentList);
  // @ts-expect-error: Unnecessary check
  return response.data;
};

/** Querystring for mail api - form urlencoded * */
/* example: queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'index'}); */
/* result: //=> 'foo[0]=1&foo[1]=2&foo[2]=3' */
export const queryStringFormat = (object): string =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  queryString.stringify(object, { arrayFormat: 'index' });
