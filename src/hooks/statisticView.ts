import { currentSelectedDate } from '@/store/common';
import {
  currentPeriodForView,
  PeriodTypeForStat,
  currentSelectedDateForStat,
  currentPeriodForStat,
} from '@/store/statistics';
import { Dayjs, ManipulateType } from 'dayjs';
import { useRecoilState } from 'recoil';

export function useStatisticView() {

  /**
   * selected period type state
   */
  const [periodType, setPeriodType] =
    useRecoilState<PeriodTypeForStat>(currentPeriodForStat);

  /**
   * selected date for statistic view (all types)
   */
  const [selectedDate, setSelectedDate] = useRecoilState(
    // currentSelectedDateForStat,
    currentSelectedDate,
  );

  /**
   * selected date (temporary for calendar selection) for statistic view (all types)
   */
  const [tempSelectedDate, setTempSelectedDate] = useRecoilState<any>(
    currentSelectedDateForStat,
  );


  const getPeriodType = (): PeriodTypeForStat => periodType;
  const setNewPeriodType = (newPeriodType: PeriodTypeForStat) =>
    setPeriodType(newPeriodType);

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
   * month/year view state (month type only)
   */
  const [switchView, setSwitchView] =
    useRecoilState<PeriodTypeForStat>(currentPeriodForView);
  const getSwitchView = () => switchView;
  const setNewSwitchView = () =>
    setSwitchView(switchView === 'BY_MONTH' ? 'BY_YEAR' : 'BY_MONTH');



  const getSelectedDate = () => selectedDate;

  const setNewSelectedDate = (
    periodType: PeriodTypeForStat,
    newDate: Dayjs,
  ) => {
    setSelectedDate({
      [periodType]: newDate,
      ...selectedDate,
    });
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

  return {
    // getPeriodType,
    // setNewPeriodType,
    // getPeriodString,

    // getSelectedDate,
    // setNewSelectedDate,

    // getSwitchView,
    // setNewSwitchView,

    getWeekPeriodInputFormat,
    setNewDateRange,

    tempSelectedDate,
    setTempSelectedDate,
  };
}
