import { buttonText } from '@/constants/message';
import { atom } from 'recoil';

// Common Modal
export interface IModalState {
  open: boolean;
  title: string;
  msg: string;
  btn1Text?: string;
  btn1ClickHandler?: () => void;
  btn2Text?: string;
  btn2ClickHandler?: () => void;
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

export const modalButtonState = atom({
  key: 'ModalButtonState',
  default: {
    isDisabled: false,
    clickHandler: () => {},
    text: buttonText.confirm,
  },
});

