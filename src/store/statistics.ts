import { atom } from 'recoil';
import { StatisticsDetail } from '@/api/statistics.api';

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
