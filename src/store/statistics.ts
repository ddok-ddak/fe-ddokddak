import { atom } from 'recoil';
import { StatisticsDetail } from '@/api/statistics.api';
import dayjs from 'dayjs';
import { PeriodType } from '@/pages/statistics/Period';

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
export const selectedStartDate = atom({
  key: 'selectedStartDate',
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
  default: '04:00:00'
});


export type PeriodType = 'BY_DAY' | 'BY_WEEK' | 'BY_MONTH' | 'BY_YEAR';

export interface IPeriodType {
  title: string;
  id: PeriodType;
  subTitle: string;
}

export const periodTypeList: IPeriodType[] = [
  { title: '하루', id: 'BY_DAY', subTitle: '오늘' },
  { title: '일주일', id: 'BY_WEEK', subTitle: '이번주' },
  { title: '한 달', id: 'BY_MONTH', subTitle: '이번달' },
  { title: '일 년', id: 'BY_YEAR', subTitle: '이번해' },
];


/**
 * selected type of period
 */
export const selectedPeriodType = atom({
  key: 'selectedPeriodType',
  default: 'BY_DAY' as PeriodType
});