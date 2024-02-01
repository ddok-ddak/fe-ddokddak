import { Method } from 'axios';

import CommonResponse, { getInstance } from '../http';
import { Cookies } from 'react-cookie';

export interface APIContract {
  headers?: any;
  method: Method;
  url: string;
  params?: object;
  body?: object;
}

const cookies = new Cookies();

export const callAPI = async <T = any>(
  { headers, url, method, params, body }: APIContract,
  isLoading?: boolean,
): Promise<any> => {
  let response: CommonResponse = {
    successOrNot: 'N',
    statusCode: '',
    data: {},
  };

  try {
    const request = {
      headers: {
        Authorization: `bearer ${cookies.get('accessToken')}`,
      },
      url,
      method,
      params,
      data: body,
    };
    response = await getInstance(isLoading).request(request);
  } catch (error) {
    response.data = error;
  }

  // return response as CommonResponse<T>; 추후에 response 정해지면 any 대신 사용
  return response as any;
};
