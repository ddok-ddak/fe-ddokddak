import { atom } from 'recoil';
import { INextButtonState } from './common';
import { buttonText } from '@/constants/message';

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
    text: buttonText.next,
  }
});

export const signInUpStepInstruction = atom<string>({
  key: 'signInUpStepInstruction',
  default: buttonText.next,
});

// sign up custom hook
export const signUpStepNextButton = atom({
  key: 'SignUpStepNextButton', 
  default: () => {}
});

// verification code id
export const authenticationRequestId = atom({
  key: 'AuthenticationRequestId', 
  default: 0,
});
