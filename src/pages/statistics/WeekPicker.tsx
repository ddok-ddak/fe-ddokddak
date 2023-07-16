import { isPropsEqual } from '@fullcalendar/core/internal';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import weekdayPlugin from 'dayjs/plugin/weekday';
import { renderDateInput } from './Period';

dayjs.extend(isBetweenPlugin);
dayjs.extend(weekdayPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;


const WeekPicker = ({ value, setValue, onChange }: any): JSX.Element => {
  
  /**
   * render the weekpicker date
   * @param date 
   * @param selectedDates 
   * @param pickersDayProps 
   * @returns <CustomPickersDay/>
  */
  const renderWeekPickerDay = (
    date: Dayjs,
    selectedDates: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>,
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }
    
    const start = value.startOf('week');
    const end = value.endOf('week');
    
    const dayIsBetween = date.isBetween(start, end, null, '[]');
    const isFirstDay = date.isSame(start, 'day');
    const isLastDay = date.isSame(end, 'day');
    
  return (
    <CustomPickersDay
      {...pickersDayProps}
      disableMargin
      dayIsBetween={dayIsBetween}
      isFirstDay={isFirstDay}
      isLastDay={isLastDay}
    />
    );
  };
  
  /**
   * render the date range format
   * @param value date
   * @returns date format
   */
  const renderDayInputFormat = (value: any) => 
    `${value.startOf('week').format('MM월 DD일 dddd')} ~ ${value.endOf('week').format('MM월 DD일 dddd')}`;
  
  return (
    <DatePicker
      value={value}
      onChange={(newValue) => {
        onChange(dayjs(newValue).startOf('week'));
      }}
      renderDay={renderWeekPickerDay}
      inputFormat={renderDayInputFormat(value)}
      renderInput={(params: any) => renderDateInput({params, width: 220})}
    />
  );
};

export default WeekPicker;