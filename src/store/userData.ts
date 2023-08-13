import { atom } from 'recoil';

/**
 * 사용자 모드
 * NORMAL 일반인
 * STUDENT 학생
 * WORKER 직장인
 */
export type UserTemplateType = null | 'NORMAL' | 'STUDENT' | 'WORKER';
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

export const userDataState = atom({
  key: 'userDataType',
  default: {
    email: '',
    password: '',
    nickname: '',
    role: '',
    status: '',
    authProviderType: '',
    templateType: null,
    startDay: '',
    startTime: '',
  } as UserData,
});
