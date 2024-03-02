import { buttonText } from '@/constants/message';
import { atom } from 'recoil';
import { INextButtonState } from './common';

// Common Modal
export interface IModalState {
  open: boolean;
  title: string;
  msg: string;
  btn1Text?: string;
  btn1ClickHandler?: any;
  btn2Text?: string;
  btn2ClickHandler?: any;
  optionList?: any;
  isShowConfirmBtn?: boolean;
}

export const modalState = atom<IModalState>({
  key: 'modal',
  default: {
    open: false,
    title: '',
    msg: '',
    btn1Text: '',
    btn1ClickHandler: () => {},
    btn2Text: '',
    btn2ClickHandler: () => {},
  },
});

export const modalButtonState = atom<INextButtonState>({
  key: 'ModalButtonState',
  default: {
    isDisabled: false,
    clickHandler: () => {},
    text: buttonText.confirm,
  },
});

export const modalValue = atom<any>({
  key: 'ModalValue',
  default: {},
});
