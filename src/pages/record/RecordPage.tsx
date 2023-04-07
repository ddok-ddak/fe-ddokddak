import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import dayjs from 'dayjs';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Container } from '@mui/system';
import moment from 'moment-timezone';
import React, { useState,useEffect } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { SelectedRangeData } from './CreateRecordPage';

import Spacer from '@/components/common/Spacer';
import CommonHeader from '@/components/layout/CommonHeader';
import { selectedTimeRangeState } from '@/store/record';

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}


// interface EventInputData {
//   categoryId: number;
//   categoryName: string;
//   startedAt: string;
//   finishedAt: string;
// }

const renderEventContent = (eventInfo: any) => {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
};

// const INITIAL_EVENTS = [
//   {
//     id: '0',
//     title: 'test1',
//     start: new Date().toISOString().replace(/T.*$/, '')+'T15:00:00',
//   },
//   {
//     id: '1',
//     title: 'test2',
//     start: '2023-04-05T07:00:00 KST',
//     end: '2023-04-05T07:30:00 KST',
//   },
// ];

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

  // const history = useHistory();
  // const handleEventClick = (e: any) => {
  //   history.push(`/record/update?start=${e.start}&end=${e.end}&category=${e.category}`);
  // }

  const handleEventClick = (e: any) => {
    console.log(e);
    const url = `/record/update/${e.event.id}`;
    console.log(url);
    // const url = `/record/update`;
    // navigation(url);
  };

  // const handleEventClick = (info: EventClickArg) => {
  //   const event = clickInfo.event;

  //   const { id, title, start, end } = event;

  //   // history.push(`/record/update?id=${id}&title=${title}&start=${start}&end=${end}`);
  // };
  const handleEvents = (e: any) => {
    console.log(e);
  };

  

  // const [events, setEvents] = useState<Event[]>([]);

  ////시간소비 활동 API - 조회
  const member= 1;

  function getWeekStartEndDates(): { fromStartedAt: string, toStartedAt: string } {
    const now = new Date();
  
    // 일주일의 첫 시작일로 설정합니다. 일요일 4시(한국 기준)로 고정합니다.
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay(), 4 + 9);
    // 일주일의 마지막 날짜로 설정합니다. 토요일 3시(한국 기준)로 고정합니다.
    const endOfWeek = new Date(now.getFullYear(), now.getMonth(), startOfWeek.getDate() + 6, 3 + 9);
  
    // 주어진 형식으로 날짜를 문자열로 변환합니다.
    const fromStartedAt = startOfWeek.toISOString().substring(0, 10) + 'T' + '04:00:00';
    const toStartedAt = endOfWeek.toISOString().substring(0, 10) + 'T' + '03:00:00';
  
    return { fromStartedAt, toStartedAt };
}

const [events, setEvents] = useState<Event[]>([]);
const { fromStartedAt, toStartedAt } = getWeekStartEndDates();

useEffect(() => {
  async function fetchEvents() {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/activity-records?memberId=${encodeURIComponent(member)}&fromStartedAt=${encodeURIComponent(fromStartedAt)}&toStartedAt=${encodeURIComponent(toStartedAt)}`
      );
      const data = await res.json();
      console.log(data);
      if (data.message === "Success") {
        const events = data.result.map((item: any) => {
          const startedAt = item.startedAt.replace(" KST", "")
          const finishedAt = item.startedAt.replace(" KST", "")
          return {
            id: item.categoryId,
            title: item.categoryName,
            start: startedAt,
            end: finishedAt,
            resourceId: item.categoryId,
          };
        });
        setEvents(events);
        console.log("events: " , events);
      }
    } catch (error) {
      console.error(error);
    }
  }
  fetchEvents();
}, [fromStartedAt, toStartedAt]);


  // const handleRecordCreate = async (info: EventInput) => {
  //   const newEvent = {
  //     id: events.length + 1,
  //     title: info.categoryName,
  //     start: info.startedAt,
  //     end: info.finishedAt,
  //   };
  //   setEvents([...events, newEvent]);
  // };

  function renderTitle(info: any) {
    console.log(info.start, info.end);
    const startDate = dayjs(info.start.marker).day(0).format('M월 D일 (ddd)');
    const endDate = dayjs(info.start.marker).day(6).format('M월 D일 (ddd)');
  return `${startDate} ~ ${endDate}`;
  }

  return (
    <div>
      <CommonHeader title={'일주일 기록하기'} />
      <Container
        sx={{
          height: 'calc(100vh - 112px)',
        }}
      >
        <Spacer y={16} />
        <FullCalendar
          height={'calc(100% - 16px)'}
          allDaySlot={false}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          titleFormat={renderTitle}
          eventColor="#FF8999"
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          // dayMaxEvents={true}
          // initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
          // events={initialEvents()}
          // events={handleRecordCreate}
          events = {events}
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
