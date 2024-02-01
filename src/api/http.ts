import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';
const cookie = new Cookies();

/**
 * set bearer authorization token to cookie
 * @param accessToken bearer authorization token
 */
export const setTokenCookie = (accessToken: any) => {
  if (accessToken) {
    cookie.set('accessToken', accessToken);
    cookie.set('refreshToken', accessToken);
  }
}

export default interface CommonResponse<T = any> {
  status: string;
  statusCode: string;
  errorMessage?: string;
  result?: any;
}

export const getInstance = (isLoading = true, params?: any): AxiosInstance => {
  const baseURL = `${process.env.REACT_APP_URL}`;

  const instance = axios.create({
    baseURL: baseURL,
    params: { ...params },
  });

  /**
   * request interceptor
   */
  instance.interceptors.request.use(
    async (
      config: InternalAxiosRequestConfig,
    ): Promise<InternalAxiosRequestConfig> => {

      const token = cookie.get('accessToken');
      if (config.headers && token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error: any): Promise<any> => {
      return Promise.reject(error);
    },
  );

  /**
   * response interceptor
   */
  instance.interceptors.response.use(
    async (response: any): Promise<any> => {
      const data = response.data;
      console.log('response', response)
      if (data && data.result && data.result.authorization) {
        setTokenCookie(data.result.authorization.replace('Bearer ', ''));
        window.location.href = '/signin/redirect';
      }

      return response.data;
    },
    async (error: any): Promise<any> => {
      const unknownError: CommonResponse = {
        status: 'FAIL',
        statusCode: 'UNKNOWN.ERROR',
        errorMessage: error.message,
        result: {},
      };
      return unknownError;
    },
  );

  return instance;
};
