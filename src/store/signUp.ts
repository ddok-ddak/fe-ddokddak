import { atom } from 'recoil';

// sign up step current index
export const SignUpStepState = atom({
  key: 'signUpState',
  default: 0,
});

// sign up user data
export interface ISignUpDataState {
  email: string,
  nickname: string,
  password: string,
}

export const SignUpDataState = atom({
  key: 'signUpData',
  default: {
    email: '',
    nickname: '',
    password: '',
  },
  dangerouslyAllowMutability: false
});

// sign up next button props
export interface ISignInUpNextButtonState {
  isDisabled: boolean,
  clickHandler: () => void,
  text: string
}

export const SignInUpNextButtonState = atom({
  key: 'signUpNextButton',
  default: {
    isDisabled: true,
    clickHandler: () => {},
    text: '다음'
  }
});

// sign up step instructions
export interface ISignUpStepInstruction {
  text: string
}

export const SignUpStepInstruction = atom({
  key: 'signUpStepInstruction',
  default: '',
});

// sign up custom hook
export const SignUpStepNextButton = atom({
  key: 'signUpStepNextButton', 
  default: () => {}
});