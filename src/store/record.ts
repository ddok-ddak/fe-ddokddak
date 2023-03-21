import { atom } from 'recoil';

import { SelectedRangeData } from '@/pages/record/CreateRecordPage';

export const selectedTimeRangeState = atom({
  key: 'selectedTimeRangeState',
  default: {} as SelectedRangeData,
});

export const recoilCategory = atom({
  key: 'recoilCategory',
  default: 0,
});

export const recoilSubCategory = atom({
  key: 'recoilSubCategory',
  default: 0,
});