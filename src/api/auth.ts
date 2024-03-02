import { callAPI } from './common/api';
import CommonResponse from './http';

/**
 * 사용자 모드
 * UNEMPLOYED 일반인
 * STUDENT 학생
 * WORKER 직장인
 */
export type UserTemplateType = 'NONE' | 'UNEMPLOYED' | 'STUDENT' | 'WORKER';
export interface UserData {
  email: string;
  nickname: string;
  password?: string;
  role?: string;
  status?: string;
  authProviderType?: string;
  templateType?: UserTemplateType;
  startDay?: string;
  startTime?: string;
}

/************************ SIGN UP PROCESS ************************/

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
      email,
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
      nickname,
    },
  });

  return response as CommonResponse;
};

/**
 * verify code
 * @param param
 * @returns response
 */
export const requestCode = async (email: string) => {
  const response = await callAPI({
    url: '/api/v1/auth/email/code',
    method: 'POST',
    body: {
      email,
      authenticationType: 'JOIN',
    },
  });

  return response as CommonResponse;
};

/**
 * verify code
 * @param param
 * @returns response
 */
export const verifyCode = async ({
  authenticationRequestId,
  authenticationNumber,
}: {
  authenticationRequestId: number;
  authenticationNumber: string;
}) => {
  const response = await callAPI({
    url: '/api/v1/auth/email/verification',
    method: 'POST',
    body: {
      authenticationRequestId,
      authenticationNumber,
    },
  });

  return response as CommonResponse;
};

/************************  SIGN UP  ************************/

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

/************************  DELETE ACCOUNT  ************************/

/**
 * user delete
 * @param request: UserData
 * @returns response
 */
export const deleteUser = async () => {
  const response = await callAPI({
    url: '/api/v1/auth/withdrawal',
    method: 'POST',
  });
  console.log(response);
  return response as CommonResponse;
};

/************************  SIGN IN  ************************/

/**
 * user sign in
 * @param request: sign in user data
 * @returns response
 */

export const signIn = async (request: any) => {
  const response = await callAPI({
    url: '/api/v1/auth/signin',
    method: 'POST',
    body: request,
  });

  return response as CommonResponse;
};

/************************  SIGN OUT  ************************/

/**
 * user sign in
 * @param request: sign in user data
 * @returns response
 */
export const signOut = async () => {
  const response = await callAPI({
    url: '/api/v1/auth/signout',
    method: 'POST',
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

/************************ SET USER MODE TEMPLATE (first time) ************************/

export const setTemplate = async (templateType: UserTemplateType) => {
  const response = await callAPI({
    url: '/api/v1/members/custom/category-template',
    method: 'POST',
    body: { templateType },
  });

  return response as CommonResponse;
};

/************************ SET USER MODE TEMPLATE (update) ************************/

export const updateTemplate = async (templateType: UserTemplateType) => {
  const response = await callAPI({
    url: '/api/v1/members/custom/category-template',
    method: 'PUT',
    body: { templateType },
  });

  return response as CommonResponse;
};
