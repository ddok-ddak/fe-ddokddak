import { atom } from 'recoil';

// 공통 모달
export interface IModalState {
  open: boolean;
  title: string;
  msg: string;
  btn1Text: string;
  btn1ClickHandler: () => void;
  btn2Text: string;
  btn2ClickHandler: () => void;
}


export const modalState = atom({
  key: 'modal',
  default: {
    open: false,
    title: '',
    msg: '',
    btn1Text: '',
    btn1ClickHandler: () => {},
    btn2Text: '',
    btn2ClickHandler: () => {}
  } as IModalState,
});