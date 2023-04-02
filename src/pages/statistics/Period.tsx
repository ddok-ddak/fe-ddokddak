import { getStatisticsData, StatisticsRequest } from '@/api/statistics.api';
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Grid,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  useState,
  SyntheticEvent,
  useEffect,
  JSXElementConstructor,
  ReactElement,
} from 'react';

import WeekPicker from './WeekPicker';

dayjs.extend(utc);

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

type PeriodType = 'BY_DAY' | 'BY_WEEK' | 'BY_MONTH' | 'BY_YEAR';

export interface IPeriodType {
  title: string;
  id: PeriodType;
}

const periodTypeList: IPeriodType[] = [
  { title: '일별', id: 'BY_DAY' },
  { title: '주별', id: 'BY_WEEK' },
  { title: '월별', id: 'BY_MONTH' },
  { title: '연별', id: 'BY_YEAR' },
];

const Period = () => {
  const [periodType, setPeriodType] = useState<PeriodType>(
    periodTypeList[0].id,
  );
  const handlePeriodChange = (e: SyntheticEvent, selectedDate: PeriodType) => {
    setPeriodType(selectedDate);
  };

  const currDate = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(dayjs(currDate));
  const [requtestDate, setRequtestDate] = useState<StatisticsRequest>({
    fromStartedAt: '',
    toFinishedAt: '',
  });

  const getStatistics = async (request: StatisticsRequest) => {
    const response = await getStatisticsData({
      ...request,
    });
    console.log(response);
  };

  useEffect(() => {
    let finishedAt = '';
    if (periodType === 'BY_DAY') {
      finishedAt = `${selectedDate
        .add(1, 'day')
        .format('YYYY-MM-DD')}T00:00:00`;
    } else if (periodType === 'BY_MONTH') {
      finishedAt = `${selectedDate
        .add(1, 'month')
        .format('YYYY-MM-DD')}T00:00:00`;
    } else if (periodType === 'BY_WEEK') {
      finishedAt = `${selectedDate
        .add(1, 'week')
        .format('YYYY-MM-DD')}T00:00:00`;
    } else if (periodType === 'BY_YEAR') {
      finishedAt = `${selectedDate
        .add(1, 'year')
        .format('YYYY-MM-DD')}T00:00:00`;
    }

    getStatistics({
      fromStartedAt: `${selectedDate.format('YYYY-MM-DD')}T00:00:00`,
      toFinishedAt: finishedAt,
    });
  }, [selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* 날짜 선택 타입 시작 */}
      <Box sx={{ bgcolor: 'background.paper' }}>
        <AppBar position="static">
          <Tabs
            value={periodType}
            onChange={handlePeriodChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs"
          >
            {periodTypeList.map((period, idx) => (
              <Tab
                key={'period-selector-' + idx}
                label={period.title}
                value={period.id}
                {...a11yProps(idx)}
              />
            ))}
          </Tabs>
        </AppBar>
      </Box>
      {/* 날짜 선택 타입 끝 */}

      {/* 날짜 선택 시작 */}
      <Grid
        container
        sx={{
          direction: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 1,
          borderBottom: 1,
        }}
      >
        {periodType === 'BY_DAY' && (
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => {
              if (newValue) {
                setSelectedDate(newValue);
              }
            }}
            inputFormat="YYYY년 MM월 DD일"
            renderInput={(params: any) => (
              <TextField {...params} helperText={null} />
            )}
          />
        )}
        {periodType === 'BY_WEEK' && (
          <WeekPicker value={selectedDate} setSelectedDate={setSelectedDate} />
        )}
        {periodType === 'BY_MONTH' && (
          <DatePicker
            views={['year', 'month']}
            inputFormat="YYYY년 MM월"
            value={selectedDate}
            minDate={dayjs('2023-01-01')}
            maxDate={dayjs(currDate)}
            onChange={(newValue: any) => {
              if (!newValue) {
                return;
              }
              setSelectedDate(newValue);
            }}
            renderInput={(params: any) => (
              <TextField {...params} helperText={null} />
            )}
          />
        )}
        {periodType === 'BY_YEAR' && (
          <DatePicker
            views={['year']}
            value={selectedDate}
            minDate={dayjs('2023-01-01')}
            maxDate={dayjs(currDate)}
            onChange={(newValue: any) => {
              if (!newValue) {
                return;
              }
              setSelectedDate(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        )}
      </Grid>
      {/* 날짜 선택 끝 */}
    </LocalizationProvider>
  );
};

export default Period;
