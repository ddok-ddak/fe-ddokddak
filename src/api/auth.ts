import { UserData } from '@/store/userData';
import { callAPI } from './common/api';
import CommonResponse from './http';

/************************ SIGN UP ************************/

/**
 * check duplicated email
 * @param email email
 * @returns response
 */
export const checkDuplicatedEmail = async (email: string) => {
  const response = await callAPI({
    url: '/api/v1/members/duplicatedEmail',
    method: 'GET',
    params: {
      email
    },
  });

  return response as CommonResponse;
};

/**
 * check duplicated nickname
 * @param nickname nickname
 * @returns response
 */
export const checkDuplicatedNickname = async (nickname: string) => {
  const response = await callAPI({
    url: '/api/v1/members/duplicateNickname',
    method: 'GET',
    params: {
      nickname
    }
  });

  return response as CommonResponse;
};

/**
 * user sign up
 * @param request: UserData 
 * @returns response
 */
export const addUser = async (request: UserData) => {
  const response = await callAPI({
    url: '/api/v1/auth/signup',
    method: 'POST',
    body: request,
  });

  return response as CommonResponse;
};

/************************  SIGN IN  ************************/

/**
 * user sign in
 * @param request: UserData 
 * @returns response
 */
export const signIn = async (request: UserData) => {
  const response = await callAPI({
    url: '/api/v1/auth/signin',
    method: 'POST',
    body: request,
  });

  return response as CommonResponse;
};

/**
 * user social sign in
 * @param registrationId (google / naver / kakao)
 * @returns response
 */
export const socialSignIn = async (registrationId: string) => {
  const response = await callAPI({
    url: `/api/oauth2/authorization/${registrationId}`,
    method: 'GET',
  });

  return response as CommonResponse;
};


/************************ USER INFO ************************/

export const getInfo = async () => {
  const response = await callAPI({
    url: '/api/v1/members/me',
    method: 'GET',
  });

  return response as CommonResponse;
};