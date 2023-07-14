import {
  getStatisticsData,
  StatisticsDetail,
  StatisticsRequest,
} from '@/api/statistics.api';
import { statisticsResultState } from '@/store/statistics';
import { AppBar, Tabs, Tab, Box, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { ManipulateType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ko';
import { useState, SyntheticEvent, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import WeekPicker from './WeekPicker';

import { selectedStartDate } from '@/store/statistics';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale('ko');


function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export type PeriodType = 'BY_DAY' | 'BY_WEEK' | 'BY_MONTH' | 'BY_YEAR';

export interface IPeriodType {
  title: string;
  id: PeriodType;
}

const periodTypeList: IPeriodType[] = [
  { title: '하루', id: 'BY_DAY' },
  { title: '일주일', id: 'BY_WEEK' },
  { title: '한 달', id: 'BY_MONTH' },
  { title: '일 년', id: 'BY_YEAR' },
];

const Period = () => {
  const [periodType, setPeriodType] = useState<PeriodType>(
    periodTypeList[0].id,
  );
  const currDate = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedStartDate);

  const setStatisticsResult = useSetRecoilState<StatisticsDetail[]>(
    statisticsResultState,
  );

  const handlePeriodChange = (e: SyntheticEvent, selectedDate: PeriodType) => {
    setPeriodType(selectedDate);
  };

  /**
   * set data search range with newly selected date
   * @param newValue newly selected date
   */
  const setNewDateRange = (newValue: any) => {
    if (newValue) {
      setSelectedDate({...selectedDate, [periodType]: newValue});
    }
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

  /**
   * returns rendered input
   * @param params 
   * @returns rendered input
   */
  const setRenderedInput = (params: any) => {
    return (
      <TextField
        {...params}
        helperText={null}
        sx={{
          '& fieldset': { 
            border: 'none'
            
            //border: '1px solid red'
          },
          width: '250px',
          border: '1px solid pink'
        }}
      />
  )};

  useEffect(() => {
    let date = selectedDate[periodType];
    let type: ManipulateType = 'day';
    switch (periodType) {
      case 'BY_MONTH': 
        type = 'month';
        break;
      case 'BY_WEEK': 
        type = 'week';
        break;
      case 'BY_YEAR': 
        type = 'year';
        break;
      default:
        break;
    }

    getStatistics({
      fromStartedAt: `${date.format('YYYY-MM-DD')}T00:00:00`,
      toFinishedAt: `${date.add(1, type).format('YYYY-MM-DD')}T00:00:00`,
    });
  }, [selectedDate, periodType]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* 날짜 선택 타입 시작 */}
      <Box sx={{ bgcolor: 'background.paper' }}>
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{
            boxShadow: '0px 5px 3px 1px rgba(0,0,0,0.05)',
          }}
        >
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
        }}
      >
        {periodType === 'BY_DAY' && (
          <DatePicker
            value={selectedDate[periodType].locale('ko')}
            inputFormat='MM월 DD일 dddd'
            renderInput={setRenderedInput}
            onChange={setNewDateRange}
          />
        )}
        {periodType === 'BY_WEEK' && (
          <WeekPicker
            value={selectedDate[periodType].locale('ko')}
            onChange={setNewDateRange}
            setSelectedDate={setSelectedDate}
          />
        )}
        {periodType === 'BY_MONTH' && (
          <DatePicker
            value={selectedDate[periodType].locale('ko')}
            inputFormat='YYYY년 MM월'
            renderInput={setRenderedInput}
            onChange={setNewDateRange}
            views={['year', 'month']}
            openTo='month'
          />
        )}
        {periodType === 'BY_YEAR' && (
          <DatePicker
            value={selectedDate[periodType].locale('ko')}
            inputFormat='YYYY년'
            renderInput={setRenderedInput}
            onChange={setNewDateRange}
            views={['year']}
            minDate={dayjs('2023-01-01')}
            maxDate={dayjs(currDate)}
          />
        )}
      </Grid>
      {/* 날짜 선택 끝 */}
    </LocalizationProvider>
  );
};

export default Period;
