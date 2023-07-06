import { UserData } from '@/store/userData';
import { callAPI } from './common/api';
import CommonResponse from './http';

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
 * @param nickname 
 * @returns response
 */
export const addUser = async (userData: UserData) => {
  const response = await callAPI({
    url: '/api/v1/auth/signup',
    method: 'POST',
    params: {
      userData
    }
  });

  return response as CommonResponse;
};