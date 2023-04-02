import { atom } from 'recoil';

export const currentUserInfo = atom({
  key: 'currentUserInfo',
  default: {
    isLogin: null,
    email: null,
  },
  dangerouslyAllowMutability: true,
});
