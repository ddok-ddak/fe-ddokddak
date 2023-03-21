import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Container } from '@mui/system';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { SelectedRangeData } from './CreateRecordPage';

import Spacer from '@/components/common/Spacer';
import CommonHeader from '@/components/layout/CommonHeader';
import { selectedTimeRangeState } from '@/store/record';

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
//     start: '2023-03-21T07:00:00',
//     end: '2023-03-21T07:30:00',
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

  const handleEventClick = (e: any) => {
    console.log(e);
  };
  const handleEvents = (e: any) => {
    console.log(e);
  };

  ////시간소비 활동 API - 조회
  // useEffect(() => {
  //   async function fetchEvents() {
  //     const res = await fetch('http://localhost:8080/api/v1/activity-records');
  //     const data = await res.json();
  //     if (data.length > 0) {
  //       const events = data.map((item: any) => {
  //         return {
  //           id: item.categoryId,
  //           title: item.categoryName,
  //           start: new Date(item.startedAt),
  //           end: new Date(item.finishedAt),
  //         };
  //       });
  //       setEvents(events);
  //     }
  //   }
  //   fetchEvents();
  // }, []);

  // const handleRecordCreate = async (info: EventInput) => {
  //   const newEvent = {
  //     id: events.length + 1,
  //     title: info.categoryName,
  //     start: info.startedAt,
  //     end: info.finishedAt,
  //   };
  //   setEvents([...events, newEvent]);
  // };

  //로컬에 저장
  const timezone = 'Asia/Seoul';
  const initialEvents = (): EventInput[] => {
  
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  return events.map((event) => ({
    id: event.id.toString(),
    title: event.title,
    start:moment.tz(event.start, timezone).format('YYYY-MM-DDTHH:mm:ss'),
    end: moment.tz(event.end, timezone).format('YYYY-MM-DDTHH:mm:ss'),
  }));
};

  return (
    <div>
      <CommonHeader title={'메인화면'} />
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
          eventColor="#FF8999"
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          // dayMaxEvents={true}
          // initialEvents={initialEvents} // alternatively, use the `events` setting to fetch from a feed
          events={initialEvents()}
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
