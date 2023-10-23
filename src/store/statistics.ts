import { atom } from 'recoil';
import { StatisticsDetail } from '@/api/statistics.api';
import dayjs from 'dayjs';

export interface IModalState {
  open: boolean;
  title: string;
  msg: string;
}

export const dateTypeState = atom({
  key: 'dateType',
  default: {
    open: false,
    title: '',
    msg: '',
  } as IModalState,
});

/**
 * statistic data
 */
export const statisticsResultState = atom({
  key: 'statisticsResult',
  default: [] as StatisticsDetail[],
});

/**
 * current date range for each type of statistics
 */
const currDate = dayjs(new Date().toISOString().slice(0, 10));
export const currentSelectedDateForStat = atom({
  key: 'CurrentSelectedDateForStat',
  default: {
    BY_DAY: currDate,
    BY_WEEK: currDate,
    BY_MONTH: currDate,
    BY_YEAR: currDate,
  },
});

/**
 * start hour of each day for statistics
 */
export const statisticsStartHour = atom({
  key: 'statisticsStartHour',
  default: '04:00:00',
});


/**
 * CALENDAR
 */
export interface IPeriodType {
  title: string;
  id: PeriodTypeForStat;
}
export interface IPeriodTypeForStat extends IPeriodType {
  title: string;
  id: PeriodTypeForStat;
  subTitle: string;
}

export type PeriodTypeForStat = 'BY_DAY' | 'BY_WEEK' | 'BY_MONTH' | 'BY_YEAR';

export const periodForStatListValue: IPeriodTypeForStat [] = [
  { title: '하루', id: 'BY_DAY', subTitle: '오늘' },
  { title: '일주일', id: 'BY_WEEK', subTitle: '이번주' },
  { title: '한 달', id: 'BY_MONTH', subTitle: '이번달' },
  { title: '일 년', id: 'BY_YEAR', subTitle: '이번해' },
];
export const periodForStatList = atom<IPeriodType[]>({
  key: 'PeriodForStatList',
  default: periodForStatListValue,
});

export const currentPeriodForStat = atom<PeriodTypeForStat>({
  key: 'CurrentPeriodForStat',
  default: periodForStatListValue[0].id,
});

/**
 * VIEW
 */


export type PeriodTypeForView = 'BY_MONTH' | 'BY_YEAR';
export interface IPeriodTypeForView {
  title: string;
  id: PeriodTypeForView;
}
export const periodForViewListValue: IPeriodTypeForView[] = [
  { title: '한 달', id: 'BY_MONTH' },
  { title: '일 년', id: 'BY_YEAR' },
];

export const periodForViewList = atom<IPeriodTypeForView[]>({
  key: 'PeriodForViewList',
  default: periodForViewListValue,
});

export const currentPeriodForView = atom<PeriodTypeForView>({
  key: 'CurrentPeriodForView',
  default: periodForViewListValue[0].id,
});
