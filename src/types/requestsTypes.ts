import type {
  Axios,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
} from 'axios';
import type { SubmissionResponse } from './filingTypes';

export interface AxiosDefaultsExtended<D = unknown>
  extends Omit<AxiosRequestConfig<D>, 'headers'> {
  headers: HeadersDefaults;
  retryCount?: number;
  handleStartInterceptorCallback?: (
    response: AxiosResponse<SubmissionResponse>,
  ) => void;
  handleRetryEndCallback?: () => void;
}

export interface AxiosInstanceExtended extends Axios {
  <T = unknown, R = AxiosResponse<T>, D = unknown>(
    config: AxiosRequestConfig<D>,
  ): Promise<R>;
  <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  defaults: AxiosDefaultsExtended;
}