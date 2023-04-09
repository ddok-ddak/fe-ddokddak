import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

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

  instance.interceptors.request.use(
    async (
      config: InternalAxiosRequestConfig,
    ): Promise<InternalAxiosRequestConfig> => {
      const sessionUser = {
        idToken: '1111',
        sessionId: '213123',
      };

      if (config.headers) {
        config.headers['x-correation-id'] = '';
        config.headers['x-api-key'] = '';

        if (sessionUser.idToken) {
          config.headers['Authorization'] = sessionUser.idToken;
        }

        if (sessionUser.sessionId) {
          config.headers['x-session-id'] = sessionUser.sessionId;
        }
      }
      return config;
    },
    (error: any): Promise<any> => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    async (response: any): Promise<any> => {
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
