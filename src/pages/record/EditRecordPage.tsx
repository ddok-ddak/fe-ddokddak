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
import { FormType, currentFormType, stepButtonProps } from '@/store/common';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from 'mui_pickers_6';
import { AdapterDayjs } from 'mui_pickers_6/AdapterDayjs';
import { LocalizationProvider } from 'mui_pickers_6/LocalizationProvider';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import FlexBox from '@/components/common/FlexBox';
import Wrapper from '../auth/common/Wrapper';
import { theme } from '@/styles';

export interface MainCategoryProps {
  categoryId: number;
  name: string;
  level?: number;
  color: string;
  highlightColor: string;
  subCategories: SubCategoryProps[];
}

export interface SubCategoryProps {
  categoryId?: any;
  id?: any;
  start: any;
  end: any;
  subCategories?: any[];
  level?: any;
  name?: any;
  iconName?: any;
  color?: any;
  highlightColor?: any;
  value?: any;
  content?: any;
}

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

const EditRecordPage = (): ReactElement => {
  const navigate = useNavigate();
  const currentDay = new Date().getDay();

  // const setShowNav = useSetRecoilState(showBottomNav);

  const setStepType = useSetRecoilState<FormType>(currentFormType);
  const setNextButtonProps = useSetRecoilState(stepButtonProps);

  const [categories, setCategories] = useState<MainCategoryProps[]>([]);

  const [mainCategory, setMainCategory] = useState<MainCategoryProps>();

  // 수정중인 이벤트
  const [selectedEvent, setSelectedEvent] =
    useRecoilState<SubCategoryProps>(currentSelectedEvent);

  const [selectedDays, setSelectedDays] = useRecoilState(selectedDaysState);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedSubCategoryIdx, setSelectedSubCategoryIdx] = useState(0);

  const [recoilCategoryValue, setRecoilCategoryValue] =
    useRecoilState(recoilCategory);
  const setRecoilSubCategoryValue = useSetRecoilState(recoilSubCategory);
  const recordType = useRecoilValue(currentRecordPageType);

  const [content, setContent] = useState<string>('');

  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);

  const [tempTime, setTempTime] = useState<Dayjs>(dayjs(selectedEvent.start));
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
        selectedTime = tempTime.hour();
        optionList = Array(12)
          .fill(undefined)
          .map((_, index) => index + 1);
        optionList.forEach((option: number, index: number) => {
          if (option === selectedTime) {
            toSwipeIndex = index;
            return true;
          }
        });
        break;
      case 'minute':
        selectedTime = tempTime.minute();
        optionList = ['00', '30', ' ', ' ', ' ', ' ', ' ', ' '];
        toSwipeIndex = selectedTime === 0 ? 0 : 1;
        break;
      case 'period':
        selectedTime = tempTime.locale('en').format('A');
        optionList = ['AM', 'PM', ' ', ' ', ' ', ' ', ' ', ' '];
        toSwipeIndex = selectedTime === 'AM' ? 0 : 1;
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
          swiper.slideToLoop(toSwipeIndex - (type === 'hour' ? 0 : 0));
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
                const value = Number(event.target.innerText);
                let newTime: Dayjs = tempTime;
                if (type === 'period') {
                  if (selectedTime === 'AM') {
                    newTime = tempTime.add(12, 'hour');
                  } else {
                    newTime = tempTime.subtract(12, 'hour');
                  }
                } else if (type === 'hour') {
                  newTime = tempTime.hour(value);
                } else if (type === 'minute') {
                  newTime = tempTime.minute(value);
                }
                setTempTime(newTime);
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
                    취소
                  </Button>
                  <Button
                    sx={{
                      color: 'grey.500',
                      fontSize: '13px',
                      p: 0,
                      m: '15px 0 0 0',
                    }}
                    onClick={() => {
                      setSelectedEvent(() => {
                        return {
                          ...selectedEvent,
                          [eventTimeType]: new Date(formatDate(tempTime)),
                        };
                      });
                      setIsTimePickerOpen(false);
                    }}
                  >
                    완료
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
    const response = await getCategories();
    const result = response.result;
    if (result) {
      setCategories(result);

      // Main Category Data Set
      if (recordType === 'UPDATE') {
        result.forEach((category: MainCategoryProps) => {
          const subCategories: SubCategoryProps[] = category.subCategories;
          subCategories?.forEach((subCategory) => {
            if (
              Number(subCategory.categoryId) ===
              Number(selectedEvent.categoryId)
            ) {
              setMainCategory(category);

              setSelectedCategoryIdx(category.categoryId - 1);
              setSelectedSubCategoryIdx(subCategory.categoryId);
              return true;
            }
          });
        });
      }
    } else {
      alert('Error');
    }
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
    try {
      const response = await addRecord({
        categoryId: selectedSubCategoryIdx,
        startedAt,
        finishedAt,
        content,
        timeUnit: 30,
      });
      const result = response.result;
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
    }
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
      const result = response.result;
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
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
    setSelectedDays([]);
    navigate('/record');
  }

  /**
   * delete record
   */
  const deleteEventReord = async () => {
    const eventId = selectedEvent.id;
    const result = await deleteRecord(eventId);
    if (result.status === 'SUCCESS') {
      navigate('/record');
    } else {
      console.error('FAILED TO DELETE');
      // TODO: MODAL
    }
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

  const pink200 = theme.palette.pink![200];

  useEffect(() => {
    // set initially selected day
    setSelectedDays([selectedEvent.start.getDay()]);

    // get all category data
    getAllCategories();

    // hide bottom nav
    // setShowNav(false);

    // set form type
    setStepType(() => 'RECORD');

    // set button props
    setNextButtonProps(() => {
      return {
        isDisabled: false,
        text: '삭제하기',
        clickHandler: deleteEventReord,
      };
    });

    setContent(selectedEvent.content || '');
  }, []);

  useEffect(() => {
    if (recordType === 'CREATE') {
      // setSelectedSubCategoryIdx(0);
    }
  }, [selectedCategoryIdx]);

  // 선택한 메인카테고리, sub카테고리 recoil에 저장
  useEffect(() => {
    if (recordType === 'CREATE') {
      // setSelectedSubCategoryIdx(0);
    }
    setRecoilCategoryValue(selectedCategoryIdx);
  }, [selectedCategoryIdx, setRecoilCategoryValue, recoilCategoryValue]);

  useEffect(() => {
    setRecoilSubCategoryValue(selectedSubCategoryIdx);
  }, [selectedSubCategoryIdx, setRecoilSubCategoryValue, recoilCategoryValue]);

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
      <Box>
        <Container sx={{ flexGrow: '1' }}>
          <Spacer y={8} />

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
              {['일', '월', '화', '수', '목', '금', '토'].map(
                (day, dayIndex) => {
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
                },
              )}
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
              categories.map((category: MainCategoryProps, idx) => {
                const isSelected = idx === selectedCategoryIdx;
                return (
                  <StyledChip
                    key={category.categoryId}
                    label={category.name}
                    variant={isSelected ? 'filled' : 'outlined'}
                    onClick={() => {
                      setSelectedSubCategoryIdx(() => 0);
                      setSelectedCategoryIdx(idx);
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
            {categories[selectedCategoryIdx]?.subCategories.map(
              (sub: SubCategoryProps) => {
                const subSelected = selectedSubCategoryIdx === sub.categoryId;
                return (
                  <Circle
                    key={sub.name}
                    label={sub.name}
                    variant={subSelected ? 'filled' : 'outlined'}
                    color={sub.color}
                    fontColor={subSelected ? sub.highlightColor : ''}
                    borderColor={subSelected ? sub.highlightColor : ''}
                    size={40}
                    iconName={sub.iconName}
                    iconSize={26}
                    selected={subSelected}
                    onClick={() =>
                      setSelectedSubCategoryIdx(() => sub.categoryId)
                    }
                  />
                );
              },
            )}
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
          <Container
            sx={{
              flex: '0 0 10vh',
            }}
          >
            {BottomButton()}
          </Container>
        )}
      </Box>
    </Wrapper>
  );
};

export default EditRecordPage;
