import { atom } from 'recoil';

export const popupShowState = atom({
  key: 'PopupShowState',
  default: false,
});

export const popupSuccessState = atom({
  key: 'PopupSuccessState',
  default: true,
});