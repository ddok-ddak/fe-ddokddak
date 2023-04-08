import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import dayjs from 'dayjs';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Container } from '@mui/system';
import React, { useRef,useState,useEffect } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { SelectedRangeData } from './CreateRecordPage';

import Spacer from '@/components/common/Spacer';
import CommonHeader from '@/components/layout/CommonHeader';
import { selectedTimeRangeState } from '@/store/record';

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}


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

  ////시간소비 활동 API - 조회
  const member= 1;
  const [events, setEvents] = useState<Event[]>([]);
  
  function renderTitle(info: any) {
    console.log(info.start, info.end);
    const startDate = dayjs(info.start.marker).day(0).format('M월 D일 일요일');
    const endDate = dayjs(info.start.marker).day(6).format('M월 D일 토요일');
  return `${startDate} ~ ${endDate}`;
  }


  useEffect(() => {
    const initialInfo = { start: new Date() };
    fetchEvents(initialInfo);
  }, []);
  
  const fetchEvents = async (info: any) => {
    const fromStartedAt = dayjs(info.start).day(0).hour(4).format('YYYY-MM-DDT04:00:00');
    const toStartedAt = dayjs(info.start).day(6).hour(3).format('YYYY-MM-DDT03:00:00');
  
    console.log('fromStartedAt:', fromStartedAt); // YYYY-MM-DDT04:00:00
    console.log('toStartedAt:', toStartedAt); // YYYY-MM-DDT03:00:00
    console.log(fromStartedAt, toStartedAt);
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/activity-records?memberId=${encodeURIComponent(member)}&fromStartedAt=${encodeURIComponent(fromStartedAt)}&toStartedAt=${encodeURIComponent(toStartedAt)}`
      );
      const data = await res.json();
  
      if (data.message === "Success") {
        const activityRecords = data.result;

        const events: Event[] = [];

        // 기록이 연속된지 확인
        for (let i = 0; i < activityRecords.length; i++) {
          const item = activityRecords[i];
          const startedAt = item.startedAt.replace(" KST", "");
          let finishedAt = item.startedAt.replace(" KST", "");
          const categoryId = item.categoryId;
          const categoryName = item.categoryName;

          let nextIndex = i + 1;

          // 다음 기록이 연속된 기록인지 확인
          while (nextIndex < activityRecords.length && activityRecords[nextIndex].categoryId === categoryId) {
            finishedAt = activityRecords[nextIndex].startedAt.replace(" KST", "");
            i++;
            nextIndex++;
          }

          events.push({
            id: categoryId,
            title: categoryName,
            start: startedAt,
            end: finishedAt,
          });
        }

        setEvents(events);
        console.log("events: ", events);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initialInfo = { start: new Date() };
    fetchEvents(initialInfo);
  }, []);

  
  const handleEventContent = (arg: any) => {
    return (
      <div>
        <b>{arg.timeText}</b>
        <i>{arg.event.title}</i>
      </div>
    );
  };

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
            left: "prev",
            center: "title",
            right: "next",
          }}
          dayHeaderFormat={{ day: "numeric" }} //일만 표시
          // dayHeaderContent={handleDayHeaderContent}  //토요일은 파란색, 일요일은 빨간색으로 표시
          titleFormat={renderTitle}
          datesSet={(info) => {
            const title = renderTitle(info);
            fetchEvents(info);
          }} 
          eventColor="#FF8999"
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          // dayMaxEvents={true}
          // initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
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