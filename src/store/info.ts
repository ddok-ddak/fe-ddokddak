import { atom } from 'recoil';
import { UserData } from './userData';

export const currentUserInfo = atom<UserData>({
  key: 'currentUserInfo',
  default: {
    email: '',
    nickname: '',
    role: '',
    status: '',
    authProviderType: '',
    templateType: null,
    startDay: '',
    startTime: '',
  },
  dangerouslyAllowMutability: true,
});
