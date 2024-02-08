import Chevron from '@/components/common/Chevron';
import Spacer from '@/components/common/Spacer';
import { useStatisticView } from '@/hooks/statisticView';
import { currentPeriod, currentSelectedDate } from '@/store/common';
import {
  PeriodTypeForView,
  currentPeriodForView,
  tempSelectedDateForStat,
} from '@/store/statistics';
import { theme } from '@/styles';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const calendarPalette = theme.palette.calendar!;
const pinkPalette = theme.palette.pink!;

const date = new Date();
const currentDate = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const yearList = Array.from({ length: 12 }, (_, i) => currentYear - 8 + i);

export const CustomCalendar = (pickerProps: any) => {
  /**
   * ref for calendar previous button
   */
  const prevBtn = useRef();

  /**
   * ref for calendar next button
   */
  const nextBtn = useRef();

  const periodType = useRecoilValue<any>(currentPeriod);

  const setSelectedDate = useSetRecoilState<any>(currentSelectedDate);

  const tempSelectedDate = useRecoilValue<any>(tempSelectedDateForStat);

  const [switchView, setSwitchView] =
    useRecoilState<PeriodTypeForView>(currentPeriodForView);

  const { setNewDateRange, setTempNewDateRange } = useStatisticView();

  /**
   * render custom calendar day elements (day, week type only)
   * @param elementDate
   * @returns rendered calendar day
   */
  const renderCustomCalendarDay = (elementDate: Dayjs) => {
    const date = tempSelectedDate![periodType];

    const elemYear = elementDate.year();
    const elemMonth = elementDate.month();
    const elemWeekday = elementDate.weekday();
    const elemDate = elementDate.date();

    // for weekly calendar highlighter
    const start = date.startOf('week');
    const end = date.endOf('week');
    const dayIsBetween = elementDate.isBetween(start, end, null, '[]');
    const isFirstDay = elementDate.isSame(start, 'day');
    const isLastDay = elementDate.isSame(end, 'day');

    const isPrevDate = elemYear < currentYear || elemMonth < currentMonth;

    const isCurrentDate =
      currentYear === elemYear &&
      currentMonth === elemMonth &&
      currentDate === elemDate;

    const isSelectedDate =
      (periodType === 'BY_WEEK' && dayIsBetween) ||
      (periodType === 'BY_DAY' &&
        tempSelectedDate[periodType].year() === elemYear &&
        tempSelectedDate[periodType].month() === elemMonth &&
        tempSelectedDate[periodType].date() === elemDate);

    const borderRadiusLeft =
      isFirstDay || periodType === 'BY_DAY' ? '5px' : '0px';
    const borderRadiusRight =
      isLastDay || periodType === 'BY_DAY' ? '5px' : '0px';

    let color = '';
    switch (elemWeekday) {
      case 0:
        color = isPrevDate ? calendarPalette.outSun : calendarPalette.currSun;
        break;
      case 6:
        color = isPrevDate ? calendarPalette.outSat : calendarPalette.currSat;
        break;
      default:
        color = isPrevDate ? calendarPalette.outDay : calendarPalette.currDay;
        break;
    }

    return (
      <Paper
        onClick={() => {
          setTempNewDateRange(elementDate);
        }}
        key={elementDate}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: 'none',
          position: 'relative',
          borderRadius: 0,
          margin: 0,
          padding: '0px !important',
          width: '28px',
          height: '28px',
        }}
      >
        <Grid
          item
          style={{
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            borderRadius: `${borderRadiusLeft} ${borderRadiusRight} ${borderRadiusRight} ${borderRadiusLeft}`,
            fontWeight: isSelectedDate ? '700' : '',
            backgroundColor: isSelectedDate ? pinkPalette![200] : '',
            color,
          }}
        >
          {elemDate}
        </Grid>
        <span
          style={{
            position: 'absolute',
            bottom: '-2%',
            height: '3px',
            width: '100%',
            borderRadius: '5px',
            background: isCurrentDate ? pinkPalette![500] : 'transparent',
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
    const date = tempSelectedDate[periodType];
    const month = date.month() + 1;
    const year =
      periodType === 'BY_YEAR' ||
      (periodType === 'BY_MONTH' && switchView === 'BY_YEAR')
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
                const prevPeriod = tempSelectedDate[periodType].subtract(
                  1,
                  periodType === 'BY_MONTH' ? 'year' : 'month',
                );
                if (periodType !== 'BY_MONTH') {
                  const prev: HTMLElement = prevBtn.current!;
                  prev.querySelector('button')!.click();
                }
                setTempNewDateRange(prevPeriod);
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
                const nextPeriod = tempSelectedDate[periodType].add(
                  1,
                  periodType === 'BY_MONTH' ? 'year' : 'month',
                );
                if (periodType !== 'BY_MONTH') {
                  const next: HTMLElement = nextBtn.current!;
                  next.querySelector('button')!.click();
                }
                setTempNewDateRange(nextPeriod);
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
   * @returns rendered calendar (month, year)
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

          const isSelected = elem === selected;
          const isPrevDate =
            switchView === 'BY_YEAR' || periodType === 'BY_YEAR'
              ? elem < currentYear
              : elem < currentMonth || date.year() < currentYear;
          const isCurrentDate =
            switchView === 'BY_YEAR' || periodType === 'BY_YEAR'
              ? elem === currentYear
              : date.year() === currentYear && currentMonth + 1 === elem;

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
                  const oldDate = tempSelectedDate[periodType];
                  const newDate =
                    switchView === 'BY_YEAR' || periodType === 'BY_YEAR'
                      ? oldDate.year(elem)
                      : oldDate.month(elem - 1);
                  setTempNewDateRange(newDate);
                }}
                sx={{
                  p: 0,
                  m: 0,
                  fontWeight: isSelected ? '700' : '400',
                  color: isSelected ? 'grey.600' : 'calendar.outDay',
                  borderRadius: '5px',
                }}
                key={index}
              >
                <span
                  style={{
                    width: '37px',
                    height: '28px',
                    borderRadius: '5px',
                    backgroundColor: isSelected ? pinkPalette![200] : '',
                    color: isPrevDate
                      ? calendarPalette!.outDay
                      : calendarPalette!.currDay,
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
                      ? pinkPalette![500]
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
      onClose={() => {
        setSelectedDate(tempSelectedDate);
      }}
      {...pickerProps}
    />
  );
};
