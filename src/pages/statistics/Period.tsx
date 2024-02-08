import {
  getStatisticsData,
  StatisticsDetail,
  StatisticsRequest,
} from '@/api/statistics.api';
import Chevron from '@/components/common/Chevron';
import { CustomCalendar } from '@/components/common/CustomCalendar';
import DateInput from '@/components/date/DateInput';
import { useStatisticView } from '@/hooks/statisticView';
import {
  currentCalendarType,
  currentPeriod,
  currentSelectedDate,
  customCalendarType,
} from '@/store/common';
import { statisticsResultState, statisticsStartHour } from '@/store/statistics';
import { AppBar, Box, Grid, styled, Tab, Tabs } from '@mui/material';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import weekdayPlugin from 'dayjs/plugin/weekday';
import { SyntheticEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale('ko');

dayjs.extend(isBetweenPlugin);
dayjs.extend(weekdayPlugin);

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export type PeriodTypeForStat = 'BY_DAY' | 'BY_WEEK' | 'BY_MONTH' | 'BY_YEAR';

export interface IPeriodType {
  title: string;
  id: PeriodTypeForStat;
}

const periodForStatList: IPeriodType[] = [
  { title: '하루', id: 'BY_DAY' },
  { title: '일주일', id: 'BY_WEEK' },
  { title: '한 달', id: 'BY_MONTH' },
  { title: '일 년', id: 'BY_YEAR' },
];

interface StyledTabProps {
  key: string;
  label: string;
  value: string;
}

/**
 * custom styled tab group
 */
const StyledTabs = styled((props: StyledTabProps) => (
  <Tabs
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
    {...props}
  />
))(({ theme }) => ({
  height: '55px',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    bottom: '13px',
    zIndex: 10,
  },
  '& .MuiTabs-indicatorSpan': {
    overflow: 'auto',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px',
    height: '4px',
    width: '31px',
  },
}));

/**
 * custom styled period select tab
 */
const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))({
  textTransform: 'none',
  fontSize: 14,
  lineHeight: 3,
  color: 'grey.500',
  fontWeight: 600,
  '&.Mui-selected': {
    color: 'pink.700',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
});

const Period = () => {
  const currDate = new Date().toISOString().slice(0, 10);
  const startHour = useRecoilValue(statisticsStartHour);
  const selectedDate = useRecoilValue<any>(currentSelectedDate);
  const [periodType, setPeriodType] = useRecoilState<any>(currentPeriod);
  const setCalendarType =
    useSetRecoilState<customCalendarType>(currentCalendarType);

  const setStatisticsResult = useSetRecoilState<StatisticsDetail[]>(
    statisticsResultState,
  );

  const {
    getWeekPeriodInputFormat,
    setNewDateRange,
    setTempNewDateRange,
    getPeriodString,
  } = useStatisticView();

  const handlePeriodChange = (
    e: SyntheticEvent,
    selectedDate: PeriodTypeForStat,
  ) => {
    setPeriodType(selectedDate);
  };

  /**
   * get data with selected date
   * @param request
   */
  const getStatistics = async (request: StatisticsRequest) => {
    const response = await getStatisticsData({
      ...request,
    });
    setStatisticsResult(response.result);
  };

  useEffect(() => {
    let startDate = selectedDate[periodType];
    let endDate = startDate.add(1, getPeriodString(periodType));

    switch (periodType) {
      case 'BY_WEEK':
        startDate = startDate.day(0);
        endDate = endDate.day(0);
        break;
      case 'BY_MONTH':
        startDate = startDate.date(1);
        endDate = endDate.date(1);
        break;
      case 'BY_YEAR':
        startDate = startDate.month(0).date(1);
        endDate = endDate.month(0).date(1);
        break;
      default:
        break;
    }

    getStatistics({
      fromStartedAt: `${startDate.format('YYYY-MM-DD')}T${startHour}`,
      toFinishedAt: `${endDate.format('YYYY-MM-DD')}T${startHour}`,
    });
  }, [selectedDate, periodType]);

  useEffect(() => {
    setCalendarType('STAT');
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* 날짜 선택 타입 시작 */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{
            height: 'inherit',
            display: 'absolute',
          }}
        >
          <StyledTabs
            value={periodType}
            onChange={handlePeriodChange}
            aria-label="statistics-category tabs"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              height: '100%',
              zIndex: 10,
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
              },
            }}
            children={periodForStatList.map((period, idx) => (
              <StyledTab
                key={'period-selector-' + idx}
                label={period.title}
                value={period.id}
                {...a11yProps(idx)}
              />
            ))}
          />
        </AppBar>
        <Box
          sx={{
            width: '100%',
            height: '79%',
            position: 'absolute',
            boxShadow: '0px 4px 15px 0px rgba(0,0,0,0.04)',
          }}
        />
      </Box>
      {/* 날짜 선택 타입 끝 */}

      {/* 날짜 선택 시작 */}
      <Grid
        container
        sx={{
          direction: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '8px 17px',
        }}
      >
        <Chevron
          callback={() => {
            setNewDateRange(
              selectedDate[periodType].subtract(1, getPeriodString(periodType)),
            );
          }}
          direction="left"
        />
        {periodType === 'BY_DAY' && (
          <>
            {CustomCalendar({
              value: selectedDate[periodType].locale('ko'),
              inputFormat: 'MM월 DD일 dddd',
              renderInput: (params: any) => (
                <DateInput params={params} width={'110px'} />
              ),
              onChange: setTempNewDateRange,
            })}
          </>
        )}
        {periodType === 'BY_WEEK' && (
          <>
            {CustomCalendar({
              value: selectedDate[periodType].locale('ko'),
              onChange: (newValue: any) =>
                setTempNewDateRange(dayjs(newValue).startOf('week')),
              inputFormat: getWeekPeriodInputFormat(
                selectedDate[periodType].locale('ko'),
              ),
              renderInput: (params: any) => (
                <DateInput params={params} width={'230px'} />
              ),
            })}
          </>
        )}
        {periodType === 'BY_MONTH' && (
          <>
            {CustomCalendar({
              value: selectedDate[periodType].locale('ko'),
              inputFormat: 'YYYY년 MM월',
              renderInput: (params: any) => {
                return <DateInput params={params} width={'85px'} />;
              },
              onChange: setTempNewDateRange,
              views: ['month', 'year'],
              openTo: 'month',
            })}
          </>
        )}
        {periodType === 'BY_YEAR' && (
          <>
            {CustomCalendar({
              value: selectedDate[periodType].locale('ko'),
              inputFormat: 'YYYY년',
              renderInput: (params: any) => (
                <DateInput params={params} width={'55px'} />
              ),
              onChange: setTempNewDateRange,
              views: ['year'],
              openTo: 'year',
              minDate: dayjs('2023-01-01'),
              maxDate: dayjs(currDate),
            })}
          </>
        )}
        <Chevron
          callback={() =>
            setNewDateRange(
              selectedDate[periodType].add(1, getPeriodString(periodType)),
            )
          }
          direction="right"
        />
      </Grid>
      {/* 날짜 선택 끝 */}
    </LocalizationProvider>
  );
};

export default Period;
