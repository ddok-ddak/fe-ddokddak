import { UserData } from '@/api/auth';
import { atom } from 'recoil';

export const currentUserInfo = atom<UserData>({
  key: 'currentUserInfo',
  default: {
    email: '',
    nickname: '',
    role: '',
    status: '',
    authProviderType: undefined,
    templateType: 'NONE',
    startDay: '',
    startTime: '',
  },
  dangerouslyAllowMutability: true,
});
