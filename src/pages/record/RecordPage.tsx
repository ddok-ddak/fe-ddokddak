import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import dayjs from 'dayjs';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Container } from '@mui/system';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { SelectedRangeData } from './CreateRecordPage';

import { getRecord } from '../../api/record.api';
import Spacer from '@/components/common/Spacer';
import CommonHeader from '@/components/layout/CommonHeader';
import { selectedTimeRangeState } from '@/store/record';

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import '../../styles/custom-calendar-styles.css';
dayjs.extend(utc);
dayjs.extend(timezone);

interface Event {
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
  const setSelectedDate = useSetRecoilState<SelectedRangeData>(
    selectedTimeRangeState,
  );

  const handleDateSelect = (e: any) => {
    const selectedDate: SelectedRangeData = {
      start: e.start,
      end: e.end,
    };
    setSelectedDate(selectedDate);
    navigation('/record/create');
  };

  const handleEventClick = (e: any) => {
    //console.log(e.event.id);
  };

  const handleEvents = (e: any) => {
    //console.log(e);
  };

  //시간소비 활동 API - 조회
  const member= 1;
  const [events, setEvents] = useState<Event[]>([]);
  
  function renderTitle(info: any) {
    const startDate = dayjs(info.start.marker).day(0).format('M월 D일 일요일');
    const endDate = dayjs(info.start.marker).day(6).format('M월 D일 토요일');
  return `${startDate} ~ ${endDate}`;
  }

  const getAllRecords = async (info: any) => {
    const startedAt = dayjs(info.start).day(0).hour(4).format('YYYY-MM-DDT04:00:00');
    const finishedAt = dayjs(info.start).day(6).hour(23).add(1, 'week').day(0).hour(3).minute(59).second(59).format('YYYY-MM-DDT03:59:59');
    //console.log(startedAt);
    //console.log(finishedAt);
    try {
      const response = await getRecord(member, startedAt, finishedAt);
  
      //console.log(response);
      //console.log(response.result);
      if (response.result) {
        const activityRecords = response.result;
  
        let events: Event[] = [];
        let currentEvent: Event | null = null;
        //console.log(activityRecords);

        // 각 activity record에 대해 처리
      activityRecords.forEach((item: any) => {
        const startedAt = dayjs(item.startedAt.replace(" KST", "")).toDate();;
        const finishedAt = dayjs(item.finishedAt.replace(" KST", "")).toDate();;

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
          if (dayjs(event.start).isSame(currentEvent.end) && event.title === currentEvent.title) {
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
  }, []);


  const transformedEvents = events.map((event) => ({
    id: String(event.id),
    title: event.title,
    start: event.start.toISOString(),
    end: event.end.toISOString(),
    color: event.color,
  }));

  return (
    <div >
      <CommonHeader title={'일주일 기록하기'} />
      <Container
        sx={{
          height: 'calc(100vh - 112px)',
        }}
      >
        <Spacer y={10} />
        <FullCalendar
          height={'calc(100% - 16px)'}
          allDaySlot={false}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          dayHeaderContent={(args) => {
            const underlineStyle = {
              borderBottom: '4px solid #FF8999',
              paddingBottom: '4px',
              width: '38px',
              height: '2px',
            };
            const isToday = dayjs(args.date).tz('Asia/Seoul').isSame(new Date(), 'day');
            const dayNumber = args.date.getDate();
            const color = args.date.getDay() === 0 ? '#FF4444' : args.date.getDay() === 6 ? '#3B66FF' : '##4B4B4B';
        
            return (
              <div>
                <div style={{ color }}>{dayNumber}</div>
                {isToday && <div style={underlineStyle}></div>}
              </div>
            );
          }}
          // dayCellContent={renderDayCellContent}
          titleFormat={renderTitle}
          datesSet={(info) => {
            getAllRecords(info);
          }} 

          initialView="timeGridWeek"
          editable={false}
          selectable={true}
          selectMirror={true}
          // dayMaxEvents={true}
          dayHeaderFormat={{
            weekday: 'short',
            day: '2-digit',
          }}
          // initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
          selectLongPressDelay={100} //모바일 기준 100이상 길게 누르면 이벤트 발생
          events = {transformedEvents}
          eventDidMount={(info) => {
            console.log('Event did mount:', info.event);
          }}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          // eventAdd={handleRecordCreate}
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          slotMinTime={'04:00:00'} // 시작시간
          slotMaxTime={'28:00:00'} // 끝시간
          slotDuration={'00:30:00'} // 시간 간격
        />

      </Container>
    </div>
  );
};

export default RecordPage;