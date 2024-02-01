import { atom } from 'recoil';
import { INextButtonState } from './common';

// sign in user data
export interface ISignInDataState {
  email: string,
  password: string,
}

export const signInDataState = atom<ISignInDataState>({
  key: 'SignInData',
  default: {
    email: '',
    password: '',
  },
  dangerouslyAllowMutability: false
});

export const signInNextButtonState = atom<INextButtonState>({
  key: 'SignInNextButtonState',
  default: {
    isDisabled: true,
    clickHandler: () => {},
    text: '로그인'
  }
});