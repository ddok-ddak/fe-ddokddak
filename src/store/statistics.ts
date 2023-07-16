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