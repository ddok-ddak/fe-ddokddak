import { atom } from 'recoil';

import { INextButtonState } from './common';

export const setModeNextButtonState = atom<INextButtonState>({
  key: 'SetModeNextButtonState',
  default: {
    isDisabled: false,
    clickHandler: () => {},
    text: '시작하기!'
  }
});
