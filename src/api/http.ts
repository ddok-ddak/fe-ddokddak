import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

const cookie = new Cookies();

/**
 * return cookie option
 * @returns cookie option for token
 */
const getTokenCookieOption = () => {
  return {
    path: '/',
    expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000), // expires after 1 hour
    domain: 'https://dodonenow.com',
    // secure: true,
    // httpOnly: false,
    // sameSite: 'none',
    // partitioned: false,
  };
};

/**
 * set bearer authorization token to cookie
 * @param token bearer authorization token
 */
export const setTokenCookie = (token: any) => {
  if (token) {
    cookie.set(ACCESS_TOKEN, token, getTokenCookieOption());
    cookie.set(REFRESH_TOKEN, token, getTokenCookieOption());
  }
};

/**
 * remove bearer authorization token from cookie
 */
export const removeTokenCookie = () => {
  cookie.remove(ACCESS_TOKEN, getTokenCookieOption());
  cookie.remove(REFRESH_TOKEN, getTokenCookieOption());
};

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
      
      // set bearer authorization token to the header
      if (config.headers) {
        const accessToken = cookie.get(ACCESS_TOKEN);
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
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
      const result = response.data.result;
      if (result && result.accessToken) {
        window.location.href = `/signin/redirect?accessToken=${result.accessToken}`;
      }
      return response.data;
    },
    async (error: any): Promise<any> => {
      // invalid token error (expired token)
      if (error.response.status === 401) {
        removeTokenCookie();
        window.location.href = '/login';
      }

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
