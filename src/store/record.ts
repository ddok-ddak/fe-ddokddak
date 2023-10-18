import { atom } from 'recoil';

import { SelectedRangeData } from '@/pages/record/CreateRecordPage';
import { StatPeriodType } from './statistics';
import dayjs from 'dayjs';

export const selectedTimeRangeState = atom({
  key: 'selectedTimeRangeState',
  default: {
    start: new Date('December 16, 2023 16:00:00'),
    end: new Date('December 16, 2023 18:30:00'),
  } as SelectedRangeData,
});

export const categories = atom<Category[]>({
  key: 'categories',
  default: [],
});

export const recoilCategory = atom({
  key: 'recoilCategory',
  default: 1,
});

export const recoilSubCategory = atom({
  key: 'recoilSubCategory',
  default: 1,
});

export const selectedDaysState = atom<number[]>({
  key: 'selectedDaysState',
  default: [],
});

type SubCategory = {
  name: string;
  color: string;
};

type Category = {
  name: string;
  color: string;
  subCategories: SubCategory[];
};

export const categoriesState = atom<Category[]>({
  key: 'categoriesState',
  default: [],
});

const currDate = dayjs(new Date().toISOString().slice(0, 10));

export const RecordRecordDate = atom({
  key: 'recordRecordDate',
  default: {
    BY_WEEK: currDate,
  },
});

export type RecordPeriodType = 'BY_WEEK';

/**
 * 통계 범위 종류 리스트
 */
export const recordPeriodList: { title: string; id: RecordPeriodType }[] = [
  { title: '일주일', id: 'BY_WEEK' },
];

export const RecordPeriod = atom<RecordPeriodType>({
  key: 'recordPeriodType',
  default: recordPeriodList[0].id,
});
