import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Container } from '@mui/system';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { SelectedRangeData } from './CreateRecordPage';

import Spacer from '@/components/common/Spacer';
import CommonHeader from '@/components/layout/CommonHeader';
import { statisticsStartHour } from '@/store/statistics';
import { getRecord } from '../../api/record.api';

import Chevron from '@/components/common/Chevron';
import { CustomCalendar } from '@/components/common/CustomCalendar';
import DateInput from '@/components/date/DateInput';
import { useStatisticView } from '@/hooks/statisticView';
import { RecordPeriod, RecordPeriodType, RecordRecordDate } from '@/store/record';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import '../../styles/custom-calendar-styles.css';
import '../../styles/custom-record-styles.css';

dayjs.extend(utc);
dayjs.extend(timezone);
export interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  categoryId: number;
  color: string;
}

const renderEventContent = (eventInfo: any) => {
  return (
    <div style={{ textAlign: 'center', margin: 'auto' }}>
      {eventInfo.event.title}
    </div>
  );
};

const RecordPage = () => {
  const navigation = useNavigate();

  const [selectedDate, setSelectedDate] = useRecoilState(RecordRecordDate);
  const periodType = useRecoilValue<RecordPeriodType>(RecordPeriod);

  const startHour = useRecoilValue(statisticsStartHour);
  const { getWeekPeriodInputFormat, setNewDateRange } = useStatisticView();

  const endHour = `${
    Number(startHour.substring(0, 2)) + 24
  }:${startHour.substring(3, 5)}:00`;
  const interval = '00:30:00';

  const calendarRef = useRef<any>(null);

  const handleDateSelect = (e: any) => {
    const newSelectedDate: SelectedRangeData = {
      start: e.start,
      end: e.end,
    };
    console.log(newSelectedDate);
    // setSelectedDate(newSelectedDate);
    // setSelectedDate(newSelectedDate);
    navigation('/record/create');
  };

  const handleEventClick = (e: any) => {
    return true;
    const instance = e.event._instance;
    const selectedDate: SelectedRangeData = {
      start: instance.range.start,
      end: instance.range.end,
    };
    console.log(e.event._context.getCurrentdata());
    // setSelectedDate(selectedDate);

    navigation('/record/create');
  };

  const handleEvents = (e: any) => {};

  //시간소비 활동 API - 조회

  const [events, setEvents] = useState<Event[]>([]);

  function renderTitle(info: any) {
    return selectedDate.locale('ko');
    const startDate = dayjs(info.start.marker).day(0).format('M월 D일 일요일');
    const endDate = dayjs(info.start.marker).day(6).format('M월 D일 토요일');
    return `${startDate} ~ ${endDate}`;
  }

  const getAllRecords = async (info: any) => {
    const startedAt = dayjs(info.start)
      .day(0)
      .format(`YYYY-MM-DDT${startHour}`);
    const finishedAt = dayjs(info.start)
      .add(1, 'week')
      .day(0)
      .format(`YYYY-MM-DDT${startHour}`);
    try {
      // const response = await getRecord(member, startedAt, finishedAt);
      const response = await getRecord(startedAt, finishedAt);

      //console.log(response);
      //console.log(response.result);
      if (response.result) {
        const activityRecords = response.result;

        let events: Event[] = [];
        let currentEvent: Event | null = null;
        //console.log(activityRecords);

        // 각 activity record에 대해 처리
        activityRecords.forEach((item: any) => {
          const startedAt = dayjs(item.startedAt.replace(' KST', '')).toDate();
          const finishedAt = dayjs(
            item.finishedAt.replace(' KST', ''),
          ).toDate();

          const event: Event = {
            id: item.activityRecordId,
            title: item.categoryName,
            start: startedAt,
            end: finishedAt,
            categoryId: item.categoryId,
            color: item.categoryColor,
          };

          if (currentEvent) {
            // 이전 이벤트가 존재하는 경우
            if (
              dayjs(event.start).isSame(currentEvent.end) &&
              event.title === currentEvent.title
            ) {
              // 연속된 이벤트인 경우 이어서 표시
              currentEvent.end = event.end;
            } else {
              // 연속된 이벤트가 아닌 경우 이전 이벤트를 events에 추가하고 현재 이벤트를 currentEvent로 설정
              events.push(currentEvent);
              currentEvent = event;
            }
          } else {
            // 이전 이벤트가 없는 경우 현재 이벤트를 currentEvent로 설정
            currentEvent = event;
          }
        });

        // 마지막 이벤트가 남아 있는 경우 events에 추가
        if (currentEvent !== null) {
          events.push(currentEvent);
        }

        setEvents(events);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initialInfo = { start: new Date() };
    getAllRecords(initialInfo);

    // apply custom style to the table
    const calendarElem = calendarRef.current.elRef.current;
    const timeSlotTdList = calendarElem.querySelectorAll(
      'table tbody td tr td:first-of-type',
    );
    timeSlotTdList.forEach((td: HTMLElement, idx: number) => {
      if (!!(idx % 2)) {
        td.style.display = 'none';
      } else {
        td.setAttribute('rowspan', '2');
      }
    });

    // console.log(selectedDate, periodType, selectedDate[periodType])
  }, []);

  const transformedEvents = events.map((event) => ({
    id: String(event.id),
    title: event.title,
    start: event.start.toISOString(),
    end: event.end.toISOString(),
    color: event.color,
  }));

  return (
    <>
      <CommonHeader title={'일주일 기록하기'} />
      <Box
        sx={{
          height: 'calc(100vh - 112px)',
        }}
      >
        <Spacer y={10} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container
            sx={{
              display: 'flex !important',
              flexDirection: 'row',
              justifyContent: 'space-between',
              '& .fc': { justifyContent: 'center' },
              '& .fc-toolbar-chunk': { padding: '0px' },
            }}
          >
            <Chevron
              callback={(e: any) => {
                const prevIcon: HTMLElement = document.querySelector(
                  '.fc-toolbar .fc-toolbar-chunk .fc-icon-chevron-left',
                )!;
                prevIcon?.click();

                setNewDateRange(selectedDate[periodType].subtract(1, 'w'));
              }}
              direction="left"
            />
            {CustomCalendar({
              pickerProps: {
                value: selectedDate[periodType].locale('ko'),
                onChange: (newValue: any) =>
                  setNewDateRange(dayjs(newValue).startOf('week')),
                inputFormat: getWeekPeriodInputFormat(
                  selectedDate[periodType].locale('ko'),
                ),
                renderInput: (params: any) => (
                  <DateInput params={params} width={'230px'} />
                ),
              },
            })}
            <Chevron
              callback={() => {
                const nextIcon: HTMLElement = document.querySelector(
                  '.fc-toolbar .fc-toolbar-chunk .fc-icon-chevron-right',
                )!;
                nextIcon?.click();
                setNewDateRange(selectedDate[periodType].add(1, 'w'));
              }}
              direction="right"
            />
          </Container>
        </LocalizationProvider>
        <FullCalendar
          ref={calendarRef}
          height={'calc(100% - 16px)'}
          allDaySlot={false}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev',
            right: 'next',
          }}
          dayHeaderContent={(args) => {
            const underlineStyle = {
              padding: '0 0 0 0',
              margin: '5px 0 -2px 0',
              width: '100%',
              backgroundColor: '#FF8999',
              borderRadius: '3px',
              height: '3px',
            };
            const isToday = dayjs(args.date)
              .tz('Asia/Seoul')
              .isSame(new Date(), 'day');
            const dayNumber = args.date.getDate();
            const color =
              dayNumber === 0
                ? '#FF4444'
                : dayNumber === 6
                ? '#3B66FF'
                : '##4B4B4B';
            return (
              <>
                <>
                  <div style={{ color }}>{dayNumber}</div>
                  {isToday && <div style={underlineStyle}></div>}
                </>
              </>
            );
          }}
          // dayCellContent={renderDayCellContent}
          datesSet={(info) => {
            getAllRecords(info);
          }}
          initialView="timeGridWeek"
          editable={false}
          selectable={true}
          selectMirror={true}
          // eventMaxStack={20}
          // eventMaxStack={20}
          // dayMaxEvents={true}
          dayHeaderFormat={{
            weekday: 'short',
            day: '2-digit',
          }}
          // initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
          selectLongPressDelay={100} //모바일 기준 100이상 길게 누르면 이벤트 발생
          events={transformedEvents}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          slotMinTime={startHour} // 시작시간
          slotMaxTime={endHour} // 끝시간
          slotDuration={interval} // 시간 간격
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
          }}
          dateClick={() => {
            // console.log('here');
          }}
        />
      </Box>
    </>
  );
};

export default RecordPage;
