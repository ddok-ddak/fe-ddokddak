import ResetPW from '@/pages/auth/resetPW/ResetPW';
import ResetPWMode from '@/pages/auth/resetPW/ResetPWMode';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { ReactElement } from 'react';
import { atom } from 'recoil';

// sign up step current index
export const resetPWStep = atom({
  key: 'ResetPWStep',
  default: 0,
});

export const resetPWStepPages = atom<ReactElement[]>({
  key: 'ResetPWStepPages',
  default: [],
});


// // sign up user data
//  interface ISignUpDataState {
//   email: string,
//   nickname: string,
//   password: string,
// }

//  const signUpDataState = atom({
//   key: 'signUpData',
//   default: {
//     email: '',
//     nickname: '',
//     password: '',
//   },
//   dangerouslyAllowMutability: false
// });

// // sign up next button props
//  interface ISignInUpNextButtonState {
//   isDisabled: boolean,
//   clickHandler: () => void,
//   text: string
// }

export const resetPWNextButtonState = atom({
  key: 'ResetPWNextButton',
  default: {
    isDisabled: true,
    clickHandler: () => {},
    text: '다음',
  },
});


export const resetPWStepInstruction = atom<string>({
  key: 'ResetPWStepInstruction',
  default: '',
});

export const resetPWMode = atom({
  key: 'ResetPWMode',
  default: 'CURRENT',
});

export const resetPWCompletePopupShow = atom({
  key: 'resetPWCompletePopupShow',
  default: false,
});

