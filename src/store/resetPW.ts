import { buttonText } from '@/constants/message';
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


export const resetPWNextButtonState = atom({
  key: 'ResetPWNextButton',
  default: {
    isDisabled: true,
    clickHandler: () => {},
    text: buttonText.next,
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
  default: true,
});

export const resetPWCompletePopupMessage = atom({
  key: 'ResetPWCompletePopupMessage',
  default: '비밀번호가 변경되었습니다.',
});

