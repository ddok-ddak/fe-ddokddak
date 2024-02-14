import { atom } from 'recoil';

import dayjs from 'dayjs';
import { INextButtonState } from './common';
import { buttonText } from '@/constants/message';
import { SubCategoryProps } from '@/pages/category/CategoryPage';

// export const selectedTimeRangeState = atom({
//   key: 'selectedTimeRangeState',
//   default: {
//     start: new Date('December 16, 2023 16:00:00'),
//     end: new Date('December 16, 2023 18:30:00'),
//   } as SelectedRangeData,
// });

export const currentSelectedEvent = atom<any>({
  key: 'CurrentSelectedEvent',
  default: { name: '', color: '' },
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


type Category = {
  name: string;
  color: string;
  subCategories: SubCategoryProps[];
};

export const categoriesState = atom<Category[]>({
  key: 'categoriesState',
  default: [],
});

export const currentSelectedDateForRecord = atom({
  key: 'CurrentSelectedDateForRecord',
  default: {
    BY_WEEK: dayjs(new Date().toISOString().slice(0, 10)),
  },
});

/**
 * RECORD PAGE TYPE
 */

type RecordPageType = 'CREATE' | 'UPDATE';
export const currentRecordPageType = atom<RecordPageType>({
  key: 'CurrentRecordPageType',
  default: 'CREATE',
});

/**
 * CALENDAR FOR RECORD
 */
export type PeriodTypeForRecord = 'BY_WEEK';

export const periodForRecordListValue: {
  title: string;
  id: PeriodTypeForRecord;
}[] = [{ title: '일주일', id: 'BY_WEEK' }];

export const periodForRecordList = atom<
  { title: string; id: PeriodTypeForRecord }[]
>({
  key: 'PeriodForRecordList',
  default: periodForRecordListValue,
});

export const currentPeriodForRecord = atom<PeriodTypeForRecord>({
  key: 'CurrentPeriodForRecord',
  default: periodForRecordListValue[0].id,
});

export const recordEditNextButtonState = atom<INextButtonState>({
  key: 'RecordEditNextButtonState',
  default: {
    isDisabled: false,
    clickHandler: () => {},
    text: buttonText.delete,
  },
});

export const recordEditCompletePopupMessage = atom({
  key: 'RecordEditCompletePopupMessage',
  default: '기록이 완료되었습니다.',
});
