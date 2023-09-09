import {
  getStatisticsData,
  StatisticsDetail,
  StatisticsRequest,
} from '@/api/statistics.api';
import { periodTypeList, statisticsResultState } from '@/store/statistics';
import { AppBar, Tabs, Tab, Box, Grid, TextField, InputAdornment, IconButton, styled } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { ManipulateType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ko';
import { useState, SyntheticEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import WeekPicker from './WeekPicker';
import { selectedStartDate, statisticsStartHour, selectedPeriodType } from '@/store/statistics';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale('ko');


function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

interface StyledTabProps {
  key: string;
  label: string;
  value: string;
}

/**
 * render date input
 */
export const renderDateInput = ({params, width}: any) => {
  return (
    <TextField 
      {...params}
      helperText={null}
      InputProps={{
        endAdornment: 
          <InputAdornment position="end" sx={{m: 0}}>
            <IconButton>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M3.52941 0H4.41176V1.76471H10.5882V0H11.4706V1.76471H14H15V2.76471V13.1176V14.1176H14H1H0V13.1176V2.76471V1.76471H1H3.52941V0ZM10.5882 2.76471V3.52941H11.4706V2.76471H14V6.17647H1V2.76471H3.52941V3.52941H4.41176V2.76471H10.5882ZM1 7.05882V13.1176H14V7.05882H1Z" 
                  fill="#4B4B4B"
                />
              </svg>
            </IconButton>
          </InputAdornment>
      }}
      sx={{
        display: 'flex',
        ' .MuiInputBase-root': { justifyContent: 'center', p: 0 },
        ' .MuiInputBase-input': { 
          p: '16px 0',
          flex: '1 1 auto',
          overflow: 'auto',
          color: '#4B4B4B',
          fontWeight: '600',
          fontSize: '14px',
          width: width + 'px',
        },
        ' .MuiInputAdornment-root' : {flex: '0 0 auto', pb: '1px'},
        '& input': { pl: 0 },
        '& fieldset': { border: 'none' }
      }}
    />
)};

/**
 * custom styled tab group
 */
const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ 
      children: <span className="MuiTabs-indicatorSpan" /> 
    }}
  />
))({
  height: '55px',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    bottom: '13px',
    zIndex: 10
  },
  '& .MuiTabs-indicatorSpan': {
    overflow: 'auto',
    backgroundColor: '#FF7184',
    borderRadius: '2px',
    height: '4px',
    width: '31px'
  },
});

/**
 * custom styled tab
 */
const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(() => ({
  textTransform: 'none',
  fontSize: 14,
  lineHeight: 3,
  color: '#949494',
  fontWeight: 600,
  '&.Mui-selected': {
    color: '#FF7184'
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

const Period = () => {
  const [periodType1, setPeriodType1] = useState<PeriodType>(
    periodTypeList[0].id,
  );

  const [periodType, setPeriodType] = useRecoilState<PeriodType>(selectedPeriodType);

  const currDate = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedStartDate);
  const startHour = useRecoilValue(statisticsStartHour);

  const setStatisticsResult = useSetRecoilState<StatisticsDetail[]>(
    statisticsResultState,
  );

  const handlePeriodChange = (e: SyntheticEvent, selectedDate: PeriodType) => {
    setPeriodType(selectedDate);
  };


  /**
   * get period string
   * @returns period string
   */
  const getPeriodString = (): ManipulateType | undefined => {
    switch (periodType) {
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


  useEffect(() => {
    let startDate = selectedDate[periodType];
    let endDate = startDate.add(1, getPeriodString());

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
      toFinishedAt: `${endDate.format('YYYY-MM-DD')}T${startHour}`
    });
  }, [selectedDate, periodType]);


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
          >
            {periodTypeList.map((period, idx) => (
              <StyledTab
                key={'period-selector-' + idx}
                label={period.title}
                value={period.id}
                {...a11yProps(idx)}
              />
            ))}
          </StyledTabs>
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
        <button 
          className='fc-next-button fc-button'
          style={{ width: '14px', height: '14px' }}
          onClick={() => setNewDateRange(selectedDate[periodType].subtract(1, getPeriodString()))}
        >
          <span 
            className='fc-icon fc-icon-chevron-left' 
            style={{ color: '#fff', top: 0, left: 0 }}
          />
        </button>

        {periodType === 'BY_DAY' && (
          <DatePicker
            value={selectedDate[periodType].locale('ko')}
            inputFormat='MM월 DD일 dddd'
            renderInput={(params: any) => renderDateInput({params, width: 100})}
            disableMaskedInput
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
            renderInput={(params: any) => renderDateInput({params, width: 80})}
            onChange={setNewDateRange}
            views={['year', 'month']}
            openTo='month'
          />
        )}
        {periodType === 'BY_YEAR' && (
          <DatePicker
            value={selectedDate[periodType].locale('ko')}
            inputFormat='YYYY년'
            renderInput={(params: any) => renderDateInput({params, width: 45})}
            onChange={setNewDateRange}
            views={['year']}
            minDate={dayjs('2023-01-01')}
            maxDate={dayjs(currDate)}
          
          />
        )}

        <button 
          className='fc-next-button fc-button'
          style={{ width: '14px', height: '14px' }}
          onClick={() => setNewDateRange(selectedDate[periodType].add(1, getPeriodString()))}
        >            
          <span 
            className='fc-icon fc-icon-chevron-right' 
            style={{ color: '#fff', top: 0, left: 0 }}
          />
        </button>
      </Grid>
      {/* 날짜 선택 끝 */}
    </LocalizationProvider>
  );
};

export default Period;
  