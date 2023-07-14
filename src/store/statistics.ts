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

export const statisticsResultState = atom({
  key: 'statisticsResult',
  default: [] as StatisticsDetail[],
});


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