import { atom } from 'recoil';

import { SelectedRangeData } from '@/pages/record/CreateRecordPage';

export const selectedTimeRangeState = atom({
  key: 'selectedTimeRangeState',
  default: {
    start: new Date('December 16, 2023 16:00:00'),
    end: new Date('December 16, 2023 18:30:00'),
  } as SelectedRangeData,
});
