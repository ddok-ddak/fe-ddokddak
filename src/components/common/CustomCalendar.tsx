import Chevron from '@/components/common/Chevron';
import Spacer from '@/components/common/Spacer';
import { useStatisticView } from '@/hooks/statisticView';
import { currentPeriod, currentSelectedDate } from '@/store/common';
import { PeriodTypeForView, currentPeriodForView } from '@/store/statistics';
import { theme } from '@/styles';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const CustomCalendar = (pickerProps: any) => {
  /**
   * ref for calendar previous button
   */
  const prevBtn = useRef();

  /**
   * ref for calendar next button
   */
  const nextBtn = useRef();

  // previously selected date
  const [selectedDate, setSelectedDate] =
    useRecoilState<any>(currentSelectedDate);

  // newly selected date (temporary)
  // const [tempSelectedDate, setTempSelectedDate] =
  //   useState<any>(currentSelectedDate);

  const periodType = useRecoilValue<any>(currentPeriod);

  const [switchView, setSwitchView] =
    useRecoilState<PeriodTypeForView>(currentPeriodForView);

  const { setNewDateRange, tempSelectedDate, setTempSelectedDate } = useStatisticView();

  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: 12 }, (_, i) => currentYear - 11 + i);

  /**
   * render custom calendar day elements (day, week type only)
   * @param date
   * @param selectedDates
   * @param pickersDayProps
   * @param value
   * @returns customized calendar days
   */
  const renderCustomCalendarDay = (elementDate: Dayjs) => {
    // const date = tempSelectedDate![periodType];
    const date = selectedDate![periodType];
    const currentDate = elementDate.date();
    const currentDay = elementDate.day();
    const currentMonth = date.month();

    const isCurrentMonth = elementDate.month() === currentMonth;
    const isCurrentDate = isCurrentMonth && currentDate === date.date();

    // for weekly calendar highlighter
    const start = date.startOf('week');
    const end = date.endOf('week');
    const dayIsBetween = elementDate.isBetween(start, end, null, '[]');
    const isFirstDay = elementDate.isSame(start, 'day');
    const isLastDay = elementDate.isSame(end, 'day');

    const backgroundColor =
      (periodType === 'BY_WEEK' && dayIsBetween) ||
      (periodType === 'BY_DAY' && isCurrentDate)
        ? 'pink.200'
        : '';
    let color = '';
    const calendarPalette = theme.palette.calendar;
    switch (currentDay) {
      case 0:
        color = isCurrentMonth
          ? calendarPalette!.currSun
          : calendarPalette!.outSun;
        break;
      case 6:
        color = isCurrentMonth
          ? calendarPalette!.currSat
          : calendarPalette!.outSat;
        break;
      default:
        color = isCurrentMonth
          ? calendarPalette!.currDay
          : calendarPalette!.outDay;
        break;
    }
    return (
      <Paper
        onClick={(props: any) => {
          const dayProp = props.target.offsetParent.getAttribute('id');
          const newSelectedDate = dayjs(Number(dayProp));
          setNewDateRange(newSelectedDate);
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
            position: 'absolute',
            borderTopLeftRadius: isFirstDay ? '5px' : '0px',
            borderBottomLeftRadius: isFirstDay ? '5px' : '0px',
            borderTopRightRadius: isLastDay ? '5px' : '0px',
            borderBottomRightRadius: isLastDay ? '5px' : '0px',
            margin: 0,
            padding: 0,
            color,
            backgroundColor,
            fontWeight: isCurrentDate ? '700' : '400',
            width: !isFirstDay && !isLastDay ? '110%' : '100%',
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
            background: isCurrentDate ? theme.palette.pink![500] : 'transparent',
          }}
        />
      </Paper>
    );
  };

  /**
   * render calendar upper control tool bar
   * @returns
   */
  const renderToolbar = () => {
    const date = selectedDate[periodType];
    const month = date.month() + 1;
    const year =
      periodType === 'BY_YEAR' || switchView === 'BY_YEAR'
        ? `${yearList[0]} ~ ${yearList[11]}`
        : date.year();

    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: periodType !== 'BY_YEAR' ? 'space-between' : 'center',
          alignItems: 'center',
          p: '4% 0',
        }}
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
                  const prevYear = tempSelectedDate['BY_MONTH'].subtract(1, 'year');
                  // setTempSelectedDate({
                  //   ...tempSelectedDate,
                  //   ['BY_MONTH']: prevYear,
                  // });
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
          {(periodType === 'BY_DAY' || periodType === 'BY_WEEK') && (
            <>
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
            </>
          )}
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
                  const nextYear = tempSelectedDate['BY_MONTH'].add(1, 'year');
                  // setTempSelectedDate({
                  //   ...tempSelectedDate,
                  //   ['BY_MONTH']: nextYear,
                  // });
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
        ? yearList
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          height: '225px',
          width: '300px',
          p: '16px 8px',
          m: 1,
        }}
        className="custom-calendar"
      >
        {list.map((elem, index) => {
          const date = tempSelectedDate[periodType].locale('ko');
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
                  const oldDate = selectedDate[periodType];
                  // const oldDate = tempSelectedDate[periodType];
                  const newDate =
                    switchView === 'BY_YEAR' || periodType === 'BY_YEAR'
                      ? oldDate.year(elem)
                      : oldDate.month(elem - 1);
                  setNewDateRange(newDate);
                  setTempSelectedDate(newDate);
                  setSelectedDate(newDate);
                  console.log('renderCustomMonthYearCalendar', newDate.year(), newDate.month())
                }}
                sx={{
                  p: 0,
                  m: 0,
                  fontWeight: isCurrentDate ? '700' : '400',
                  color: isCurrentDate ? 'grey.600' : 'calendar.outDay',
                  borderRadius: '5px',
                }}
                key={index}
              >
                <span
                  style={{
                    width: '37px',
                    height: '28px',
                    borderRadius: '5px',
                    backgroundColor: isCurrentDate
                      ? theme.palette.pink![200]
                      : '',
                  }}
                >
                  {elem}
                  {periodType === 'BY_MONTH' &&
                    switchView === 'BY_MONTH' &&
                    '월'}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-2%',
                    height: '3px',
                    width: '37px',
                    borderRadius: '5px',
                    background: isCurrentDate
                      ? theme.palette.pink![500]
                      : 'transparent',
                  }}
                />
              </Button>
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
      // render customized upper tool bar
      ToolbarComponent={() => renderToolbar()}
      components={{
        // next button
        LeftArrowButton: (props: any) => (
          <Box ref={prevBtn}>
            <Chevron callback={props.onClick} direction={'left'} />
          </Box>
        ),
        // prev button
        RightArrowButton: (props: any) => (
          <Box ref={nextBtn}>
            <Chevron callback={props.onClick} direction={'right'} />
          </Box>
        ),
        // customized calendar view (month and year type only)
        ActionBar: () => {
          if (periodType === 'BY_MONTH' || periodType === 'BY_YEAR') {
            return renderCustomMonthYearCalendar();
          }
        },
      }}
      // day element (day and week type only)
      renderDay={(date: Dayjs) => renderCustomCalendarDay(date)}
      {...pickerProps}
    />
  );
};
