import { atom } from 'recoil';
import { INextButtonState } from './common';

// sign up step current index
export const signUpStep = atom({
  key: 'SignUpState',
  default: 0,
});

// sign up user data
export interface ISignUpDataState {
  email: string,
  nickname: string,
  password: string,
}

export const signUpDataState = atom({
  key: 'SignUpData',
  default: {
    email: '',
    nickname: '',
    password: '',
  },
  dangerouslyAllowMutability: false
});


export const signInUpNextButtonState = atom<INextButtonState>({
  key: 'SignInUpNextButtonState',
  default: {
    isDisabled: true,
    clickHandler: () => {},
    text: '다음'
  }
});


export const signInUpStepInstruction = atom<string>({
  key: 'signInUpStepInstruction',
  default: '다음',
});

// sign up custom hook
export const signUpStepNextButton = atom({
  key: 'SignUpStepNextButton', 
  default: () => {}
});

