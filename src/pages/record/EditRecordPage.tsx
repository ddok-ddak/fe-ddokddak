import {
  Box,
  Button,
  Chip,
  ChipProps,
  Container,
  Dialog,
  DialogContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

import { BaseSyntheticEvent, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import { getCategories } from '../../api/category.api';
import { addRecord, deleteRecord, updateRecord } from '../../api/record.api';

import { addDays } from 'date-fns';
import { styled } from '@mui/material/styles';
import Circle from '@/components/common/Circle';
import DaysChip from '@/components/date/DaysChip';
import CommonHeader from '@/components/layout/CommonHeader';
import {
  selectedDaysState,
  recoilCategory,
  recoilSubCategory,
  currentRecordPageType,
  currentSelectedEvent,
} from '@/store/record';
import Spacer from '@/components/common/Spacer';
import BottomButton from '@/components/common/BottomButton';
import {
  FormType,
  currentFormType,
  currentPopupMessageType,
  popupMessageText,
  stepButtonProps,
} from '@/store/common';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from 'mui_pickers_6';
import { AdapterDayjs } from 'mui_pickers_6/AdapterDayjs';
import { LocalizationProvider } from 'mui_pickers_6/LocalizationProvider';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import FlexBox from '@/components/common/FlexBox';
import Wrapper from '../auth/common/Wrapper';
import { theme } from '@/styles';
import { buttonText } from '@/constants/message';
import { popupShowState, popupSuccessState } from '@/store/popupMessage';
import { MainCategoryProps, SubCategoryProps } from '../category/CategoryPage';
import { CategoryViewType, categoryViewMode } from '@/store/category';

export interface SelectedRangeData {
  start: Date;
  end: Date;
}

interface StyledChipProps extends ChipProps {
  variant: 'filled' | 'outlined';
  onClick?: () => void;
  props: any;
}

const StyledChip = styled(Chip)<StyledChipProps>(({ theme, props }) => {
  const isSelected = props.isSelected;
  const backgroundColor = props.backgroundColor;
  return {
    flex: '0 0 95px',
    height: '6vh',
    margin: '0 1%',
    color: isSelected ? 'common.white' : 'grey.500',
    borderColor: isSelected ? backgroundColor : 'grey.400',
    borderRadius: '50px',
    cursor: 'grab',
    backgroundColor: isSelected ? backgroundColor : 'transparent',
    '&:hover': {
      backgroundColor: isSelected
        ? backgroundColor
        : theme.palette.action.hover,
      cursor: 'grabbing',
    },
  };
});

// 날짜 형식 포맷 (2023-01-01T13:00:00)
const formatDate = (date: any): string =>
  dayjs(date).format('YYYY-MM-DDTHH:mm:ss');

const pink200 = theme.palette.pink![200];

const EditRecordPage = (): ReactElement => {
  const navigate = useNavigate();
  const currentDay = new Date().getDay();

  const recordType = useRecoilValue(currentRecordPageType);

  const setStepType = useSetRecoilState<FormType>(currentFormType);
  const setNextButtonProps = useSetRecoilState(stepButtonProps);
  const setPopupMessageType = useSetRecoilState(currentPopupMessageType);
  const setPopupText = useSetRecoilState(popupMessageText);
  const setIsPopupShow = useSetRecoilState(popupShowState);
  const setIsSuccessPopup = useSetRecoilState(popupSuccessState);
  const setCategoryMode = useSetRecoilState<CategoryViewType>(categoryViewMode);

  const [categories, setCategories] = useState<MainCategoryProps[]>([]);
  const [mainCategory, setMainCategory] = useState<MainCategoryProps>();

  // 수정중인 이벤트
  const [selectedEvent, setSelectedEvent] =
    useRecoilState(currentSelectedEvent);

  const [selectedDays, setSelectedDays] = useRecoilState(selectedDaysState);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedSubCategoryIdx, setSelectedSubCategoryIdx] = useState(0);

  const [recoilCategoryValue, setRecoilCategoryValue] =
    useRecoilState(recoilCategory);
  const setRecoilSubCategoryValue = useSetRecoilState(recoilSubCategory);

  const [content, setContent] = useState<string>('');

  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);

  const [tempTime, setTempTime] = useState<Dayjs>(dayjs(selectedEvent.start));
  const [isValidNewTime, setIsValidNewTime] = useState<boolean>(true);
  const [popupMsg, setPopupMsg] = useState<string>('');

  const [eventTimeType, setEventTimeType] = useState<string>('start');

  /**
   * render time picker swiper
   * @param type type (hour / minute / period)
   * @returns swiper elemement
   */
  const renderTimePickerSwiper = (type: string) => {
    let optionList: any[] = [];
    let selectedTime: any;
    let toSwipeIndex: number = 1;

    switch (type) {
      case 'hour':
        selectedTime = tempTime.locale('en').format('h');
        optionList = Array(12)
          .fill(undefined)
          .map((_, index) => index + 1);
        optionList.forEach((option: number, index: number) => {
          if (Number(selectedTime) === option) {
            toSwipeIndex = index;
            return true;
          }
        });
        break;
      case 'minute':
        selectedTime = tempTime.minute();
        optionList = ['00', '30', ' ', ' ', ' ', ' ', ' ', ' '];
        toSwipeIndex = selectedTime === 30 ? 1 : 0;
        break;
      case 'period':
        selectedTime = tempTime.locale('en').format('A');
        optionList = [' ', 'AM', 'PM', ' ', ' ', ' ', ' ', ' '];
        toSwipeIndex = selectedTime === 'AM' ? 1 : 2;
        break;
    }
    return (
      <Swiper
        direction={'vertical'}
        slidesPerView={7}
        centerInsufficientSlides={type === 'hour'}
        centeredSlides={true}
        loop={type === 'hour'}
        loopAddBlankSlides={false}
        loopAdditionalSlides={type === 'hour' ? 4 : 0}
        noSwiping={true}
        onSwiper={(swiper) => {
          swiper.slideToLoop(toSwipeIndex);
        }}
        style={{
          width: type === 'minute' ? '25%' : '40%',
          height: 'inherit',
          paddingTop: '0px',
          padding: 0,
        }}
      >
        {optionList.map((option, index) => {
          let color: string;
          let backgroundColor = '';
          let fontWeight = '400';
          let fontSize;

          const diffIndex = Math.abs(toSwipeIndex - index);
          const listLength = optionList.length;

          if (diffIndex === 0) {
            color = 'grey.700';
            backgroundColor = 'pink.200';
            fontWeight = '500';
            fontSize = '18px';
          } else if (
            diffIndex === 1 ||
            diffIndex === listLength - 1 ||
            (type === 'period' && toSwipeIndex !== index)
          ) {
            color = 'grey.500';
            fontSize = '15px';
          } else if (diffIndex === 2 || diffIndex === listLength - 2) {
            color = 'grey.400';
            fontSize = '14px';
          } else {
            color = 'grey.300';
            fontSize = '13px';
          }

          return (
            <SwiperSlide
              className={option.length ? '' : 'swiper-no-swiping'}
              key={index}
              style={{
                borderTopLeftRadius: type === 'hour' ? '5px' : '0px',
                borderBottomLeftRadius: type === 'hour' ? '5px' : '0px',
                borderTopRightRadius: type === 'period' ? '5px' : '0px',
                borderBottomRightRadius: type === 'period' ? '5px' : '0px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor,
                justifyContent:
                  type === 'hour' ? 'end' : type === 'minute' ? 'center' : '',
              }}
              onClick={(event: BaseSyntheticEvent) => {
                const currStartTime = dayjs(selectedEvent.start);
                const currEndTime = dayjs(selectedEvent.end);

                let newTime: Dayjs = tempTime;
                const meridiem = tempTime.locale('en').format('A');
                const value =
                  Number(event.target.innerText) + (meridiem === 'AM' ? 0 : 12);

                if (type === 'period') {
                  newTime = tempTime.add(12, 'hour');
                } else if (type === 'hour') {
                  newTime = tempTime.hour(value);
                } else if (type === 'minute') {
                  newTime = tempTime.minute(value);
                }

                // 시작시간 04:00 ~ 03:30
                // 04:00 ~ 23:30 : 당일
                // 00:00 ~ 03:30 : 익일

                // 끝시간 04:30 ~ 04:00
                // 04:30 ~ 23:30 : 당일
                // 00:00 ~ 04:00 : 익일

                // 당일 + 당일 : 가능, 비교 필요
                // 당일 + 익일 : 가능, 비교 불필요
                // 익일 + 익일 : 가능, 비교 필요
                // 익일 + 당일 : 불가능

                let startTime;
                let endTime;

                if (eventTimeType === 'start') {
                  startTime = newTime;
                  endTime = currEndTime;
                } else {
                  endTime = newTime;
                  startTime = currStartTime;
                }

                let startTimeF = Number(startTime.locale('en').format('Hmm'));
                let endTimeF = Number(endTime.locale('en').format('Hmm'));

                let isStartNextDay = false;
                let isEndNextDay = false;

                if (0 < startTimeF && startTimeF <= 330) {
                  // 시작시간 익일
                  isStartNextDay = true;
                  startTime = currStartTime
                    .add(1, 'day')
                    .set('hour', startTime.get('hour'))
                    .set('minute', startTime.get('minute'));
                } else {
                  // 시작시간 금일
                  if (currStartTime.get('date') < startTime.get('date')) {
                    startTime = currStartTime
                      .set('hour', startTime.get('hour'))
                      .set('minute', startTime.get('minute'));
                  }
                }

                if (0 < endTimeF && endTimeF <= 400) {
                  // 끝시간 익일
                  isEndNextDay = true;
                  endTime = currEndTime
                    .add(
                      endTime.get('date') - currStartTime.get('date') > 0
                        ? 0
                        : 1,
                      'day',
                    )
                    .set('hour', endTime.get('hour'))
                    .set('minute', endTime.get('minute'));
                } else {
                  // 끝시간 금일
                  if (currEndTime.get('date') < endTime.get('date')) {
                    endTime = currEndTime
                      .set('hour', endTime.get('hour'))
                      .set('minute', endTime.get('minute'));
                  }
                }

                let isValid = true;
                if (
                  (!isStartNextDay && !isEndNextDay) ||
                  (isStartNextDay && isEndNextDay)
                ) {
                  isValid = endTime.isAfter(startTime);
                } else if (!isStartNextDay && isEndNextDay) {
                  isValid = true;
                } else if (isStartNextDay && !isEndNextDay) {
                  isValid = false;
                }

                newTime = eventTimeType === 'start' ? startTime : endTime;
                setTempTime(newTime);
                if (isValid) {
                  setIsValidNewTime(true);
                } else {
                  setIsValidNewTime(false);
                  setPopupMsg('유효하지 않은 시간 설정입니다.');
                }
              }}
            >
              <Box
                sx={{
                  color,
                  fontWeight,
                  fontSize,
                }}
              >
                {option}
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  /**
   * format time range element
   * @param timeType type (start time / end time)
   * @returns time range element
   */
  const formatRangeTimeElem = (timeType: string): JSX.Element => {
    const time: Dayjs = dayjs(
      timeType === 'start' ? selectedEvent.start : selectedEvent.end,
    );
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
        <TimePicker
          value={time}
          onOpen={() => {
            setTempTime(time);
            setEventTimeType(timeType);
            setIsTimePickerOpen(true);
          }}
          sx={{
            input: {
              p: 0,
              minWidth: '80px',
              width: '80px',
              fontSize: '17px',
              fontWeight: '600',
            },
            fieldset: {
              display: 'none',
            },
          }}
          slots={{
            dialog: () => (
              <Dialog
                open={isTimePickerOpen}
                className={'digital-clock'}
                sx={{
                  backgroundColor: 'transparent',
                  borderRadius: '10px 10px 0 0',
                  width: '100vw',
                  height: '39vh',
                  position: 'fixed',
                  top: '70vh',
                  bottom: '0%',
                  left: '0%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 0,
                  ' .MuiPaper-root': {
                    m: 0,
                    p: 0,
                    top: 0,
                    position: 'absolute',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 0,
                    m: 0,
                    width: '100vw',
                  }}
                >
                  <Button
                    onClick={() => {
                      setIsTimePickerOpen(false);
                    }}
                    sx={{
                      color: 'grey.500',
                      fontSize: '13px',
                      p: 0,
                      m: '15px 0 0 0',
                    }}
                  >
                    {buttonText.cancel}
                  </Button>
                  <Button
                    sx={{
                      color: 'grey.500',
                      fontSize: '13px',
                      p: 0,
                      m: '15px 0 0 0',
                    }}
                    onClick={() => {
                      if (isValidNewTime) {
                        setIsSuccessPopup(true);
                        setSelectedEvent(() => {
                          return {
                            ...selectedEvent,
                            [eventTimeType]: new Date(formatDate(tempTime)),
                          };
                        });
                      } else {
                        setIsSuccessPopup(false);
                        setIsPopupShow(() => true);
                        setPopupText(popupMsg);
                      }
                      setIsTimePickerOpen(false);
                    }}
                  >
                    {buttonText.complete}
                  </Button>
                </Box>
                <DialogContent
                  sx={{
                    height: '25vh',
                    display: 'flex',
                    overflow: 'hidden',
                    p: 0,
                  }}
                >
                  {renderTimePickerSwiper('hour')}
                  {renderTimePickerSwiper('minute')}
                  {renderTimePickerSwiper('period')}
                </DialogContent>
              </Dialog>
            ),
          }}
        />
      </LocalizationProvider>
    );
  };

  /**
   * get category data
   */
  const getAllCategories = async () => {
    await getCategories().then((response) => {
      const result = response.result;
      setCategories(result);
      if (recordType === 'UPDATE') {
        result.forEach((category: MainCategoryProps) => {
          const subCategories: SubCategoryProps[] = category.subCategories;
          subCategories?.forEach((subCategory) => {
            if (
              Number(subCategory.categoryId) ===
              Number(selectedEvent.categoryId)
            ) {
              setMainCategory(category);
              setSelectedCategoryIdx(category.categoryId);
              setSelectedSubCategoryIdx(subCategory.categoryId || 0);
              return true;
            }
          });
        });
      }
    });
  };

  /**
   * create event record
   * @param startedAt start time
   * @param finishedAt end time
   * @returns result
   */
  async function createEventRecord(
    startedAt: string,
    finishedAt: string,
  ): Promise<any> {
    await addRecord({
      categoryId: selectedSubCategoryIdx,
      startedAt,
      finishedAt,
      content,
      timeUnit: 30,
    })
      .then((response) => {
        // TODO: category 선택 안했을시 팝업 띄우기
        if (response.status === 'SUCCESS') {
          setIsPopupShow(() => true);
          setIsSuccessPopup(true);
          setPopupText('기록 등록에 성공했습니다.');
          setSelectedDays([]);
          navigate('/record');
        } else {
          setIsSuccessPopup(false);
          setPopupText('기록 등록에 실패했습니다.');
        }
      })
      .catch(() => {
        setIsPopupShow(() => true);
        setIsSuccessPopup(false);
        setPopupText('서버에 오류가 발생했습니다. 다시 시도 해주세요.');
      });
  }

  /**
   * update event record
   * @param startedAt start time
   * @param finishedAt end time
   * @returns result
   */
  async function updateEventRecord(
    startedAt: string,
    finishedAt: string,
  ): Promise<any> {
    try {
      const response = await updateRecord({
        id: selectedEvent.id,
        categoryId: selectedSubCategoryIdx,
        startedAt,
        finishedAt,
        content,
      });
      setIsPopupShow(() => true);
      if (response.status === 'SUCCESS') {
        setIsSuccessPopup(true);
        setPopupText('기록 수정에 성공했습니다.');
        setSelectedDays([]);
        navigate('/record');
      } else {
        setIsSuccessPopup(false);
        setPopupText('기록 수정에 실패했습니다.');
      }
    } catch (err) {
      setIsSuccessPopup(false);
      setPopupText('서버에 오류가 발생했습니다. 다시 시도 해주세요.');
    }
  }

  /**
   * post record (create / update) for selected days
   */
  async function postAllDays(): Promise<void> {
    const { start, end } = selectedEvent;
    const currentSelectedDay = dayjs(selectedEvent.start).day();
    const firstSelectedDay = selectedDays[0];

    for (const dayIndex of selectedDays) {
      const diff = dayIndex - firstSelectedDay;
      const startedAtOfDay = formatDate(new Date(addDays(start, diff)));
      const finishedAtOfDay = formatDate(new Date(addDays(end, diff)));

      // update currently being edited event
      if (recordType === 'UPDATE' && currentSelectedDay === dayIndex) {
        await updateEventRecord(startedAtOfDay, finishedAtOfDay);
      } else {
        await createEventRecord(startedAtOfDay, finishedAtOfDay);
      }
    }
  }

  /**
   * delete record
   */
  const deleteEventRecord = async () => {
    const eventId = selectedEvent.id;
    const result = await deleteRecord(eventId);
    let popupText = '';
    if (result.status === 'SUCCESS') {
      navigate('/record');
      popupText = '기록 삭제에 성공했습니다.';
    } else {
      popupText = '기록 삭제에 실패했습니다.';
    }
    setIsPopupShow(() => true);
    setPopupText(popupText);
  };

  /**
   * handle day chip click event
   * @param dayIndex selected day index
   */
  const handleDayChipClick = (dayIndex: number) => {
    // at least a option should be selected
    if (selectedDays.length === 1 && selectedDays[0] === dayIndex) {
      return true;
    }
    if (selectedDays.includes(dayIndex)) {
      setSelectedDays(() =>
        selectedDays.filter((selectedDay) => selectedDay !== dayIndex),
      );
    } else {
      setSelectedDays([...selectedDays, dayIndex]);
    }
  };

  useEffect(() => {
    if (recordType === 'CREATE') {
      setSelectedSubCategoryIdx(0);
    }
  }, [selectedCategoryIdx]);

  // 선택한 메인카테고리, sub카테고리 recoil에 저장
  useEffect(() => {
    if (recordType === 'CREATE') {
      setSelectedSubCategoryIdx(0);
    }
    setRecoilCategoryValue(selectedCategoryIdx);
  }, [selectedCategoryIdx, setRecoilCategoryValue, recoilCategoryValue]);

  useEffect(() => {
    setRecoilSubCategoryValue(selectedSubCategoryIdx);
  }, [selectedSubCategoryIdx, setRecoilSubCategoryValue, recoilCategoryValue]);

  useEffect(() => {
    // set initially selected day
    setSelectedDays([selectedEvent.start.getDay()]);

    // get all category data
    getAllCategories();

    // hide bottom nav
    // setShowNav(false);

    // set form type
    setStepType(() => 'RECORD');

    setPopupMessageType('RECORD');

    // set button props
    setNextButtonProps(() => {
      return {
        isDisabled: false,
        text: buttonText.delete,
        clickHandler: deleteEventRecord,
      };
    });

    setContent(selectedEvent.content || '');
  }, []);

  return (
    <Wrapper
      headerComp={
        <CommonHeader
          title={'기록하기'}
          isShowPrevButton={true}
          isShowNextButton={true}
          onClickNextButton={postAllDays}
        />
      }
    >
      <Container sx={{ flex: '1 1 100vh' }}>
        {/* Selected Days */}
        <Box
          sx={{
            position: 'relative',
            height: '12vw',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: 'calc(11vw + 2px)',
              flex: '1 0 12vh',
              boxShadow: '0px 9px 15px 0px rgba(0, 0, 0, 0.04)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '13vw',
              flex: '1 1 12vh',
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            {['일', '월', '화', '수', '목', '금', '토'].map((day, dayIndex) => {
              const isSelected = selectedDays.includes(dayIndex);
              const isCurrentDate = currentDay === dayIndex;
              return (
                <DaysChip
                  key={day}
                  title={day}
                  isselected={isSelected}
                  underline={isCurrentDate}
                  onClick={() => handleDayChipClick(dayIndex)}
                  color={
                    dayIndex === 0
                      ? 'calendar.currSun'
                      : dayIndex === 6
                      ? 'calendar.currDay'
                      : ''
                  }
                />
              );
            })}
          </Box>
        </Box>

        {/* Time Range */}
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '32px',
          }}
        >
          {formatRangeTimeElem('start')}
          <FlexBox>
            <Typography sx={{ fontweight: '400', fontSize: '13px' }}>
              ~
            </Typography>
          </FlexBox>
          {formatRangeTimeElem('end')}
        </Container>

        <Divider sx={{ bgcolor: pink200, border: `2px solid ${pink200}` }} />

        <Container sx={{ textAlign: 'right' }}>
          <Button
            variant="text"
            component={Link}
            to="/category"
            onClick={() => {
              setCategoryMode('MODWHIDDEN');
              navigate('/category');
            }}
            sx={{ color: 'grey.500', paddingTop: '17px' }}
          >
            카테고리 설정
          </Button>
        </Container>

        {/* Main Categories */}
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            padding: '2% 0 3% 0',
          }}
        >
          {categories.length &&
            categories.map((category: MainCategoryProps) => {
              const categoryId = category.categoryId;
              const isSelected = categoryId === selectedCategoryIdx;
              return (
                <StyledChip
                  key={categoryId}
                  label={category.name}
                  variant={isSelected ? 'filled' : 'outlined'}
                  onClick={() => {
                    setSelectedCategoryIdx(categoryId);
                    setSelectedSubCategoryIdx(() => 0);
                  }}
                  props={{
                    isSelected,
                    backgroundColor: category.highlightColor,
                  }}
                />
              );
            })}
        </Container>

        <Spacer y={8} />

        {/* Sub Categories */}
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            paddingBottom: '30px',
          }}
        >
          {categories
            .filter(
              (category) => category.categoryId === selectedCategoryIdx,
            )[0]
            ?.subCategories.map((sub: SubCategoryProps, idx: number) => {
              const subCategoryId = sub.categoryId;
              const subSelected = selectedSubCategoryIdx
                ? selectedSubCategoryIdx === subCategoryId
                : !idx;
              const filename = sub.iconFile!.filename ?? '';
              return (
                <Circle
                  selected={subSelected}
                  color={sub.color}
                  borderColor={subSelected ? sub.highlightColor : ''}
                  size={40}
                  key={sub.name}
                  label={sub.name}
                  variant={subSelected ? 'filled' : 'outlined'}
                  fontColor={subSelected ? sub.highlightColor : ''}
                  iconName={filename.split('.')[0]}
                  iconSize={26}
                  onClick={() =>
                    setSelectedSubCategoryIdx(() => subCategoryId || 0)
                  }
                />
              );
            })}
        </Container>

        <Divider sx={{ bgcolor: pink200, border: `3px solid ${pink200}` }} />

        <Container sx={{ padding: '24px' }}>
          <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            placeholder="메모하기"
            variant="standard"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Container>
      </Container>
      {recordType === 'UPDATE' && (
        <BottomButton
          btnStyleProps={{ borderRadius: '0px', flex: '0 0 5vh' }}
          textStyleProps={{}}
        />
      )}
    </Wrapper>
  );
};

export default EditRecordPage;
