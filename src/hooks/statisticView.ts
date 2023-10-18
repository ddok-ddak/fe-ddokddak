import { StatCalendarViewType, PeriodType, selectedStartDate, StatPeriodType } from '@/store/statistics';
import { Dayjs, ManipulateType } from 'dayjs';
import { useRecoilState } from 'recoil';



export function useStatisticView() {

  /**
   * selected period type state
   */
  const [periodType, setPeriodType] = useRecoilState<PeriodType>(
    StatPeriodType,
  );

  const getPeriodType = (): PeriodType => periodType;
  const setNewPeriodType = (newPeriodType: PeriodType) => setPeriodType(newPeriodType);
  /**
   * get period string
   * @returns period string
   */
  const getPeriodString = (period: PeriodType): ManipulateType | undefined => {
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
  const [switchView, setSwitchView] = useRecoilState<PeriodType>(StatCalendarViewType);
  const getSwitchView = () => switchView;
  const setNewSwitchView = () => setSwitchView(switchView === 'BY_MONTH' ? 'BY_YEAR' : 'BY_MONTH')

  /**
   * selected date for statistic view (all types)
   */
  const [selectedDate, setSelectedDate] = useRecoilState(selectedStartDate);
  const getSelectedDate = () => selectedDate;
  const setNewSelectedDate = (periodType: PeriodType, newDate: Dayjs) => {
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
  };
}
