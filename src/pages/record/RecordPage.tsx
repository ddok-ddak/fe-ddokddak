import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Container } from '@mui/system';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { SelectedRangeData } from './EditRecordPage';

import Spacer from '@/components/common/Spacer';
import CommonHeader from '@/components/layout/CommonHeader';
import { statisticsStartHour } from '@/store/statistics';
import { getRecord } from '../../api/record.api';

import Chevron from '@/components/common/Chevron';
import { CustomCalendar } from '@/components/common/CustomCalendar';
import DateInput from '@/components/date/DateInput';
import { useStatisticView } from '@/hooks/statisticView';
import {
  currentPeriodForRecord,
  PeriodTypeForRecord,
  currentSelectedDateForRecord,
  currentSelectedEvent,
  currentRecordPageType,
} from '@/store/record';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import '../../styles/custom-calendar-styles.css';
import '../../styles/custom-record-styles.css';
import {
  customCalendarType,
  currentCalendarType,
  stepButtonProps,
  currentFormType,
  FormType,
} from '@/store/common';
import Wrapper from '../auth/common/Wrapper';
import { modalState } from '@/store/modal';
import { currentUserInfo } from '@/store/info';
import { UserData } from '@/store/userData';
import { UserModeList } from '../category/CategoryPage';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  content: string;
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

  const setSelectedEvent = useSetRecoilState(currentSelectedEvent);

  const selectedDate = useRecoilValue(currentSelectedDateForRecord);
  const periodType = useRecoilValue<PeriodTypeForRecord>(
    currentPeriodForRecord,
  );

  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  const setCalendarType =
    useSetRecoilState<customCalendarType>(currentCalendarType);

  const setCurrentFormType = useSetRecoilState<FormType>(currentFormType);

  const setRecordType = useSetRecoilState(currentRecordPageType);

  const startHour = useRecoilValue(statisticsStartHour);
  const endHour = `${
    Number(startHour.substring(0, 2)) + 24
  }:${startHour.substring(3, 5)}:00`;

  const [events, setEvents] = useState<Event[]>([]);

  const calendarRef = useRef<any>(null);

  const { getWeekPeriodInputFormat, setNewDateRange } = useStatisticView();

  const interval = '00:30:00';

  const userInfo = useRecoilValue<UserData>(currentUserInfo);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);

  /**
   * route to record create page of dragged time
   * @param event drag event
   */
  const handleDateSelect = (e: any) => {
    const newSelectedDate: SelectedRangeData = {
      start: e.start,
      end: e.end,
    };
    setSelectedEvent(newSelectedDate);
    setRecordType('CREATE');
    navigation('/record/edit');
  };

  /**
   * route to update page of the clicked event
   * @param event PointerEvent
   */
  const handleEventClick = (e: any) => {
    const selectedEventId = Number(e.event._def.publicId);
    const selectedEvent = events.filter(
      (event: any, idx) => selectedEventId === event.id,
    )[0];
    setSelectedEvent(selectedEvent);
    setRecordType('UPDATE');
    navigation('/record/edit');
  };

  const getAllRecords = async (info: any) => {
    const startedAt = dayjs(info.start)
      .day(0)
      .format(`YYYY-MM-DDT${startHour}`);
    const finishedAt = dayjs(info.start)
      .add(1, 'week')
      .day(0)
      .format(`YYYY-MM-DDT${startHour}`);
    try {
      const response = await getRecord(startedAt, finishedAt);
      if (response.result) {
        const activityRecords = response.result;
        let events: Event[] = [];
        let currentEvent: Event | null = null;

        // 각 activity record에 대해 처리
        activityRecords.forEach((item: any) => {
          const startedAt = dayjs(item.startedAt.replace(' KST', '')).toDate();
          const finishedAt = dayjs(
            item.finishedAt.replace(' KST', ''),
          ).toDate();

          const event: Event = {
            id: item.activityRecordId,
            title: item.categoryName,
            content: item.content,
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

  const transformedEvents = events.map((event) => ({
    id: String(event.id),
    title: event.title,
    start: event.start.toISOString(),
    end: event.end.toISOString(),
    color: event.color,
  }));

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

    // set type for custom calendar
    setCalendarType('RECORD');

    // set type for next button (for template mode setting modal)
    setCurrentFormType('SETTEMPLATE');

    setNextButtonProps({
      ...nextButtonProps,
      text: '시작하기!',
      clickHandler: () => {
        setModalInfo({
          ...modalInfo,
          open: false,
        });
      },
    });

    setModalInfo({
      open: true,
      title: `${userInfo.nickname}님 환영합니다!`,
      msg: '두던에서 나만의 시간 기록을 남겨보세요.\n사용 전 모드를 선택 해주세요 :)',
      optionList: UserModeList.map((userMode) => {
        return { id: userMode.id, type: userMode.type, name: userMode.name };
      }),
      isShowConfirmBtn: true,
    });
  }, []);

  return (
    <Wrapper headerComp={<CommonHeader title={'일주일 기록하기'} />}>
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
              value: selectedDate[periodType].locale('ko'),
              onChange: (newValue: any) =>
                setNewDateRange(dayjs(newValue).startOf('week')),
              inputFormat: getWeekPeriodInputFormat(
                selectedDate[periodType].locale('ko'),
              ),
              renderInput: (params: any) => (
                <DateInput params={params} width={'230px'} />
              ),
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
        <Container
          sx={{
            height: '78vh',
          }}
        >
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
              const date = args.date;
              const isToday = dayjs(date)
                .tz('Asia/Seoul')
                .isSame(new Date(), 'day');
              const dateNumber = date.getDate();
              const dayNumber = date.getDay();
              const color =
                dayNumber === 0
                  ? 'calendar.currSun'
                  : dayNumber === 6
                  ? 'calendar.currSat'
                  : 'grey.600';
              return (
                <>
                  <div style={{ color }}>{dateNumber}</div>
                  {isToday && (
                    <div
                      style={{
                        padding: '0 0 0 0',
                        margin: '5px 0 -2px 0',
                        width: '100%',
                        backgroundColor: 'pink.600',
                        borderRadius: '3px',
                        height: '3px',
                      }}
                    />
                  )}
                </>
              );
            }}
            datesSet={(info) => {
              getAllRecords(info);
            }}
            initialView="timeGridWeek"
            editable={false}
            selectable={true}
            selectMirror={true}
            dayHeaderFormat={{
              weekday: 'short',
              day: '2-digit',
            }}
            selectLongPressDelay={100} //모바일 기준 100이상 길게 누르면 이벤트 발생
            events={transformedEvents}
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            slotMinTime={startHour} // 시작시간
            slotMaxTime={endHour} // 끝시간
            slotDuration={interval} // 시간 간격
            slotLabelContent={(timeObj) =>
              dayjs(timeObj.date).locale('en').format('HA')
            }
          />
        </Container>
      </Box>
    </Wrapper>
  );
};

export default RecordPage;
