import { UserData } from '@/api/auth';
import { atom } from 'recoil';

export const currentUserInfo = atom<UserData>({
  key: 'currentUserInfo',
  default: {
    email: '',
    nickname: '',
    role: '',
    status: '',
    authProviderType: '',
    templateType: 'NONE',
    startDay: '',
    startTime: '',
  },
  dangerouslyAllowMutability: true,
});
