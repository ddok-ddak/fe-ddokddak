import Chevron from '@/components/common/Chevron';
import Spacer from '@/components/common/Spacer';
import {
  PeriodType,
  StatCalendarViewType,
  StatPeriodType,
  selectedStartDate,
} from '@/store/statistics';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';

export const CustomCalendar = ({
  // selectedDate,
  // periodType,
  pickerProps,
}: {
  // selectedDate: {
  //   value: Dayjs;
  //   inputFormat: string;
  //   renderInput: (params: any) => JSX.Element;
  //   onChange: (newValue: any) => void;
  // };
  // periodType: PeriodType;
  pickerProps: any;
}) => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedStartDate);
  const [switchView, setSwitchView] =
    useRecoilState<PeriodType>(StatCalendarViewType);
  const [periodType, setPeriodType] =
    useRecoilState<PeriodType>(StatPeriodType);


  /**
   * ref for calendar previous button
   */
  const prevBtn = useRef();

  /**
   * ref for calendar next button
   */
  const nextBtn = useRef();

 

  /**
   * render custom calendar day elements (day, week type only)
   * @param date
   * @param selectedDates
   * @param pickersDayProps
   * @param value
   * @returns customized calendar days
   */
  const renderCustomCalendarDay = (
    elementDate: Dayjs,
    // selectedDate: Dayjs,
    // periodType: PeriodType,
    // setNewDateRange: (selectedDate: Dayjs) => void,
  ) => {
    const date = selectedDate[periodType];
    const currentDate = elementDate.date();
    const currentDay = elementDate.day();
    const currentMonth = date.month();

    const isCurrentMonth = elementDate.month() === currentMonth;
    const isCurrentDate = isCurrentMonth && elementDate.date() === date.date();

    const start = date.startOf('week');
    const end = date.endOf('week');

    let dayIsBetween = isCurrentDate;
    let isFirstDay = isCurrentDate;
    let isLastDay = isCurrentDate;

    // if (periodType === 'BY_WEEK') {
    //   dayIsBetween = date.isBetween(start, end, null, '[]');
    //   isFirstDay = date.isSame(start, 'day');
    //   isLastDay = date.isSame(end, 'day');
    // }

    let color = '';
    switch (currentDay) {
      case 0:
        color = isCurrentMonth ? '#FF4444' : '#FF9E9E';
        break;
      case 6:
        color = isCurrentMonth ? '#3B66FF' : '#3B66FF';
        break;
      default:
        color = isCurrentMonth ? '#4B4B4B' : '#B3B3B3';
        break;
    }
    return (
      <Paper
        onClick={(props: any) => {
          const dayProp = props.target.offsetParent.getAttribute('id');
          const newSelectedDate = dayjs(Number(dayProp));
          // setNewDateRange(newSelectedDate);
        }}
        key={elementDate}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: 'none',
          position: 'relative',
          borderRadius: 0,
          margin: 0,
          padding: 0,
        }}
      >
        <Grid
          item
          style={{
            color,
            position: 'absolute',
            height: '85%',
            fontWeight: isCurrentDate ? '700' : '400',
            backgroundColor: dayIsBetween ? 'primary.light' : 'transparent',
            width: !isFirstDay && !isLastDay ? '110%' : '100%',
            borderTopLeftRadius: isFirstDay ? '5px' : '0px',
            borderBottomLeftRadius: isFirstDay ? '5px' : '0px',
            borderTopRightRadius: isLastDay ? '5px' : '0px',
            borderBottomRightRadius: isLastDay ? '5px' : '0px',
            margin: 0,
            padding: 0,
          }}
        >
          {currentDate}
        </Grid>
        <span
          style={{
            position: 'absolute',
            bottom: '5%',
            height: '3px',
            width: '100%',
            borderRadius: '5px',
            background: isCurrentDate ? '#FFA2AE' : 'transparent',
          }}
        />
      </Paper>
    );
  };
  /**
   * render calendar upper control tool bar
   * @returns
   */
  const renderToolbar = (
    // selectedDate: any,
    // periodType: PeriodType,

  ) => {
    const monthSelector = 'BY_MONTH';

    const date = selectedDate[periodType];
    const month = date.month() + 1;
    const year = date.year();

    // const handlePrevClickEvent2 = () => {
    //   if (periodType === monthSelector) {
    //     const prevYear = selectedDate[monthSelector].subtract(1, 'year');
    //     setSelectedDate({
    //       ...selectedDate,
    //       [monthSelector]: prevYear,
    //     });
    //   } else {
    //     const prev: HTMLElement = prevBtn.current!;
    //     prev.querySelector('button')!.click();
    //   }
    // };

    // const handleNexClickEvent2 = () => {
    //   if (periodType === monthSelector) {
    //     const nextYear = selectedDate[monthSelector].add(1, 'year');
    //     setSelectedDate({
    //       ...selectedDate,
    //       [monthSelector]: nextYear,
    //     });
    //   } else {
    //     const next: HTMLElement = nextBtn.current!;
    //     next.querySelector('button')!.click();
    //   }
    // };

    // const handleSwitchClickEvent2 = () => {
    //   setSwitchView(() => {
    //     return switchView === 'BY_MONTH' ? 'BY_YEAR' : 'BY_MONTH';
    //   });
    // };
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: periodType !== 'BY_YEAR' ? 'space-between' : 'center',
          alignItems: 'center',
          margin: '2% 0',
        }}
        className={'test-class'}
      >
        {periodType !== 'BY_YEAR' && (
          <Box
            sx={{
              padding: '3px',
              marginLeft: '4px',
            }}
          >
            <Chevron
              callback={() => {
                if (periodType === 'BY_MONTH') {
                  const prevYear = selectedDate['BY_MONTH'].subtract(1, 'year');
                  setSelectedDate({
                    ...selectedDate,
                    ['BY_MONTH']: prevYear,
                  });
                } else {
                  const prev: HTMLElement = prevBtn.current!;
                  prev.querySelector('button')!.click();
                }
              }}
              direction={'left'}
            />
          </Box>
        )}
        <Box
          onClick={() => {
            setSwitchView(() => {
              return switchView === 'BY_MONTH' ? 'BY_YEAR' : 'BY_MONTH';
            });
          }}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-even',
            alignItems: 'flex-end',
          }}
        >
          <Typography
            sx={{
              color: 'black',
              lineHeight: '20px',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            {year}
          </Typography>
          <Spacer x={5} />
          <Typography
            sx={{
              color: 'black',
              lineHeight: '26px',
              fontSize: '24px',
              fontWeight: '600',
            }}
          >
            {month}
          </Typography>
        </Box>
        {periodType !== 'BY_YEAR' && (
          <Box
            sx={{
              padding: '3px',
              marginRight: '4px',
            }}
          >
            <Chevron
              callback={() => {
                if (periodType === 'BY_MONTH') {
                  const nextYear = selectedDate['BY_MONTH'].add(1, 'year');
                  setSelectedDate({
                    ...selectedDate,
                    ['BY_MONTH']: nextYear,
                  });
                } else {
                  const next: HTMLElement = nextBtn.current!;
                  next.querySelector('button')!.click();
                }
              }}
              direction={'right'}
            />
          </Box>
        )}
      </Container>
    );
  };

  /**
   * render customized calendar (month, year type only)
   * @param props
   * @returns
   */
  const renderCustomMonthYearCalendar = () => {
    const list =
      switchView === 'BY_YEAR' || periodType === 'BY_YEAR'
        ? [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: 'inherit',
          height: '20vh',
          padding: 0,
          m: 1,
        }}
      >
        {list.map((elem, index) => {
          const date = selectedDate[periodType].locale('ko');
          const selected =
            switchView === 'BY_YEAR' || periodType === 'BY_YEAR'
              ? date.year()
              : date.month() + 1;
          const isCurrentDate = elem === selected;
          return (
            <Paper
              key={elem}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: '0 1 25%',
                position: 'relative',
              }}
            >
              <Button
                onClick={() => {
                  // const oldDate = selectedDate[periodType];
                  // const newDate =
                  //   switchView === 'BY_YEAR' || periodType === 'BY_YEAR'
                  //     ? oldDate.year(elem)
                  //     : oldDate.month(elem - 1);
                  // setNewDateRange(newDate);
                }}
                sx={{
                  fontWeight: isCurrentDate ? '700' : '400',
                  color: '#222222',
                  backgroundColor: isCurrentDate ? 'primary.light' : '',
                  borderRadius: '5px',
                  width: '98%',
                }}
                key={index}
              >
                {elem}{' '}
                {periodType === 'BY_MONTH' && switchView === 'BY_MONTH' && '월'}
              </Button>
              <span
                style={{
                  position: 'absolute',
                  bottom: '7%',
                  height: '3px',
                  width: '100%',
                  borderRadius: '5px',
                  background: isCurrentDate ? '#FFA2AE' : 'transparent',
                }}
              />
            </Paper>
          );
        })}
      </Container>
    );
  };
  return (
    <DatePicker
      disableMaskedInput
      reduceAnimations={true}
      showDaysOutsideCurrentMonth={true}
      showToolbar={true}
      orientation="portrait"
      ToolbarComponent={() => {
        // render customized upper tool bar
        return renderToolbar(
          // selectedDate,
          // periodType,
        );
      }}
      components={{
        LeftArrowButton: (props: any) => {
          // prev button
          return (
            <Box ref={prevBtn}>
              <Chevron callback={props.onClick} direction={'left'} />
            </Box>
          );
        },
        RightArrowButton: (props: any) => {
          // next button
          return (
            <Box ref={nextBtn}>
              <Chevron callback={props.onClick} direction={'right'} />
            </Box>
          );
        },
        ActionBar: () => {
          // render customized calendar view (month and year type only)
          if (periodType === 'BY_MONTH' || periodType === 'BY_YEAR') {
            return renderCustomMonthYearCalendar();
          }
        },
      }}
      // render day element (day and week type only)
      renderDay={(date: Dayjs) => {
        return renderCustomCalendarDay(
          date,
          // pickerProps.value,
          // setNewDateRange,
        );
      }}
      {...pickerProps}
    />
  );
};
