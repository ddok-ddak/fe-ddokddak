import { currentPeriod, currentSelectedDate } from '@/store/common';
import {
  PeriodTypeForStat, tempSelectedDateForStat
} from '@/store/statistics';
import { ManipulateType } from 'dayjs';
import { useRecoilValue, useRecoilState } from 'recoil';

export function useStatisticView() {
  /**
   * selected period type state
   */
  const periodType = useRecoilValue<PeriodTypeForStat>(currentPeriod);

  /**
   * selected date for statistic view (all types)
   */
  const [selectedDate, setSelectedDate] = useRecoilState(currentSelectedDate);

  /**
   * selected date (temporary for calendar selection) for statistic view (all types)
   */
  const [tempSelectedDate, setTempSelectedDate] = useRecoilState(
    tempSelectedDateForStat,
  );

  /**
   * get period string
   * @returns period string
   */
  const getPeriodString = (
    period: PeriodTypeForStat,
  ): ManipulateType | undefined => {
    switch (period) {
      case 'BY_DAY':
        return 'day';
      case 'BY_WEEK':
        return 'week';
      case 'BY_MONTH':
        return 'month';
      case 'BY_YEAR':
        return 'year';
      default:
        break;
    }
  };

  /**
   * get the date range format (week type only)
   * @param value date
   * @returns date format
   */
  const getWeekPeriodInputFormat = (value: any) =>
    `${value.startOf('week').format('MM월 DD일 dddd')} ~ ${value
      .endOf('week')
      .format('MM월 DD일 dddd')}`;

  /**
   * set data search range with newly selected date
   * @param newValue newly selected date
   */
  const setNewDateRange = (newValue: any) => {
    if (newValue) {
      setSelectedDate({ ...selectedDate, [periodType]: newValue });
    }
  };

  /**
   * set data search range with newly selected date
   * @param newValue newly selected date
   */
  const setTempNewDateRange = (newValue: any) => {
    if (newValue) {
      setTempSelectedDate({ ...tempSelectedDate, [periodType]: newValue });
    }
  };

  return {
    getPeriodString,

    getWeekPeriodInputFormat,

    setNewDateRange,
    setTempNewDateRange,
  };
}
