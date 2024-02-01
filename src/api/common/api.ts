import { Method } from 'axios';

import CommonResponse, { getInstance } from '../http';
import { Cookies } from 'react-cookie';

export interface APIContract {
  method: Method;
  url: string;
  params?: object;
  body?: object;
}

const cookies = new Cookies();

/**
 * get authorization bearer token
 * @returns header authorization token
 */
const getBearerToken = () => {
  const token = cookies.get('accessToken');
  return token ? { Authorization: `bearer ${token}` } : {};
};

export const callAPI = async <T = any>(
  { url, method, params, body }: APIContract,
  isLoading?: boolean,
): Promise<any> => {
  
  let response: any = {
    successOrNot: 'N',
    statusCode: '',
    data: {},
  };

  try {
    response = await getInstance(isLoading).request({
      headers: getBearerToken(),
      url,
      method,
      params,
      data: body,
    });
  } catch (error) {
    response.data = error;
  }

  // return response as CommonResponse<T>; 추후에 response 정해지면 any 대신 사용
  return response as any;
};