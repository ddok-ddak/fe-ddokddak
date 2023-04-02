import {
  Box,
  Button,
  Chip,
  Container,
  createStyles,
  Divider,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { addDays } from 'date-fns';
import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState, selectedDaysState  } from 'recoil';

import Circle from '@/components/common/Circle';
import FlexBox from '@/components/common/FlexBox';
import DaysChip from '@/components/date/DaysChip';
import CommonHeader from '@/components/layout/CommonHeader';
import { MainCategory } from '@/pages/category/CategoryPage';
import { recoilCategory, recoilSubCategory, selectedTimeRangeState } from '@/store/record';

// import styles from './CreateRecordPage.module.css';

export interface SelectedRangeData {
  start: Date;
  end: Date;
}


/**
 * 임시 data
 */
const categories: MainCategory[] = [
  {
    title: '직장',
    color: '#20FFD7',
    subCategories: [
      { title: '업무', color: '#C2FFF4' },
      { title: '야근', color: '#C2FFF4' },
      { title: '출장', color: '#C2FFF4' },
      { title: '회식', color: '#C2FFF4' },
    ],
  },
  {
    title: '성장',
    color: '#20FFD7',
    subCategories: [
      { title: '강의', color: '#C2FFF4' },
      { title: '독서', color: '#C2FFF4' },
      { title: '자격증', color: '#C2FFF4' },
    ],
  },
  {
    title: '관계',
    color: '#20FFD7',
    subCategories: [
      { title: '가족', color: '#C2FFF4' },
      { title: '연인', color: '#C2FFF4' },
      { title: '친구', color: '#C2FFF4' },
    ],
  },
  {
    title: '건강',
    color: '#20FFD7',
    subCategories: [
      { title: '식사', color: '#C2FFF4' },
      { title: '운동', color: '#C2FFF4' },
      { title: '잠', color: '#C2FFF4' },
    ],
  },
  {
    title: '낭비',
    color: '#20FFD7',
    subCategories: [
      { title: 'SNS', color: '#C2FFF4' },
      { title: '미디어', color: '#C2FFF4' },
      { title: '멍', color: '#C2FFF4' },
      { title: '웹서핑', color: '#C2FFF4' },
    ],
  },
];

const getAMPM = (date: Date) => {
  const hours = date.getHours();
  const ampm = hours > 12 ? 'PM' : 'AM';
  return ampm;
};

const CreateRecoredPage  = (): ReactElement => {
  const selectedDate = useRecoilValue(selectedTimeRangeState);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedSubCategoryIdx, setSelectedSubCategoryIdx] = useState(0);

  const [recoilCategoryValue, setRecoilCategoryValue] = useRecoilState(recoilCategory);
  const [recoilSubCategoryValue, setRecoilSubCategoryValue] = useRecoilState(recoilSubCategory);

  useEffect(() => {
    setSelectedSubCategoryIdx(0);
    setRecoilCategoryValue(selectedCategoryIdx);
  }, [selectedCategoryIdx, setRecoilCategoryValue]);

  useEffect(() => {
    setRecoilSubCategoryValue(selectedSubCategoryIdx);
  }, [selectedSubCategoryIdx, setRecoilSubCategoryValue]);
  console.log(recoilCategoryValue, recoilSubCategoryValue);

  //날짜 형식 2023-01-01T13:00:00 KST으로 포멧
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
  
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')} KST`;
  };

  console.log('selectedDate.start: ',selectedDate.start);
  //Wed Mar 22 2023 07:00:00 GMT+0900 (한국 표준시)
  console.log('formatDate(selectedDate.start): ', formatDate(selectedDate.start));
  //2023-03-22T07:00:00 KST
  console.log('formatDate(selectedDate.end): ', formatDate(selectedDate.end));

  const navigate = useNavigate();
  ////시간소비 활동 API - 등록
  // const postData = async () => {
  //   const res = await fetch('http://localhost:8080/api/v1/activity-records', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=UTF-8',
  //       'Content-Length': '165',
  //       'Host': 'localhost:8080',
  //     },
  //     body: JSON.stringify({
  //       categoryId: 1,
  //       startedAt: formatDate(selectedDate.start),
  //       finishedAt: formatDate(selectedDate.end),
  //       content: "test-activity",
  //       timeUnit: 30,
  //     }),
  //   });
  //   if (res.ok) {
  //     navigate('/record'); // 페이지 이동
  //   } else {
  //     console.log('error');
  //   }
  //   const data = await res.json();
  //   console.log(data);
  // };

  function removeKST(str: string): string {
    return str.replace(/ KST$/, '');
  }

  ////로컬에 저장
  const handleRecordCreate = (): void =>  {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    selectedDays.push(selectedDate.start.getDay());

    // selectedDays에 있는 모든 요일에 대해 일정 추가
    const newEvents = selectedDays.map((dayIndex) => ({
      id: String(events.length + 1), // 기존 이벤트 수보다 1 증가
      title: categories.find((category) => category.title === ['직장', '성장', '관계', '건강', '낭비'][recoilCategoryValue])?.title,
      start: removeKST(formatDate(addDays(selectedDate.start, dayIndex))),
      end: removeKST(formatDate(addDays(selectedDate.end, dayIndex)))
    }));
  
    // 기존 이벤트와 새로운 이벤트를 합쳐서 localStorage에 저장
    localStorage.setItem('events', JSON.stringify([...events, ...newEvents]));
    console.log(events);
    navigate('/record');
  };

  // 요일 여러개 선택
  const handleDayChipClick = (dayIndex: number) => {
    if (selectedDays.includes(dayIndex)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== dayIndex));
    } else {
      setSelectedDays([...selectedDays, dayIndex]);
    }
    return selectedDays;
  };

  return (
    <>
      <CommonHeader title={'기록하기'} isShowBackButton={true} isShowRightButton={true}
      // onClickRightButton={postData}/>
      onClickRightButton={handleRecordCreate}/>
      <Container>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '8px',
          }}
        >
          <DaysChip title="월" isSelected={selectedDate.start.getDay() === 1 || selectedDays.includes(1)} onClick={() => handleDayChipClick(1)} />
          <DaysChip title="화" isSelected={selectedDate.start.getDay() === 2 || selectedDays.includes(2)} onClick={() => handleDayChipClick(2)} />
          <DaysChip title="수" isSelected={selectedDate.start.getDay() === 3 || selectedDays.includes(3)} onClick={() => handleDayChipClick(3)} />
          <DaysChip title="목" isSelected={selectedDate.start.getDay() === 4 || selectedDays.includes(4)} onClick={() => handleDayChipClick(4)} />
          <DaysChip title="금" isSelected={selectedDate.start.getDay() === 5 || selectedDays.includes(5)} onClick={() => handleDayChipClick(5)} />
          <DaysChip title="토" isSelected={selectedDate.start.getDay() === 6 || selectedDays.includes(6)} onClick={() => handleDayChipClick(6)} />
          <DaysChip title="일" isSelected={selectedDate.start.getDay() === 0 || selectedDays.includes(0)} onClick={() => handleDayChipClick(0)} />

        </Container>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '32px',
          }}
        >
          <FlexBox>
            <Typography variant="h5">{`${selectedDate.start.getHours()}:${
              selectedDate.start.getMinutes() === 0
                ? '00'
                : selectedDate.start.getMinutes()
            }`}</Typography>
            <Typography variant="h5">{getAMPM(selectedDate.start)}</Typography>
          </FlexBox>
          <Typography variant="h5">~</Typography>
          <FlexBox>
            <Typography variant="h5">{`${selectedDate.end.getHours()}:${
              selectedDate.end.getMinutes() === 0
                ? '00'
                : selectedDate.end.getMinutes()
            }`}</Typography>
            <Typography variant="h5">{getAMPM(selectedDate.end)}</Typography>
          </FlexBox>
        </Container>
        <Divider />
        <Container sx={{ textAlign: 'right' }}>
          <Button variant="text">카테고리 설정</Button>
        </Container>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '16px',
          }}
        >
          {categories.map((category, idx) =>
            idx === selectedCategoryIdx ? (
              <Chip
                key={category.title}
                label={category.title}
                variant="filled"
                color="primary"
                size="medium"
                onClick={() => {
                  setSelectedCategoryIdx(idx);
                }
                }

              />
            ) : (
              <Chip
                key={category.title}
                label={category.title}
                variant="outlined"
                size="medium"
                onClick={() => {
                  setSelectedCategoryIdx(idx);
                }}
              />
            ),
          )}
        </Container>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '16px',
          }}
        >
          {categories &&
            categories[selectedCategoryIdx].subCategories.map((sub, idx) => (
              <Circle
                key={sub.title}
                label={sub.title}
                color={sub.color}
                size={40}
                onClick={() => {
                  setSelectedSubCategoryIdx(idx);
                }}
                selected={idx === selectedSubCategoryIdx}
              />
            ))}
        </Container>
        <Divider />
        <Container sx={{ padding: '16px' }}>
          <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            placeholder="메모하기"
            fullWidth
          />
        </Container>
      </Container>
    </>
  );
};

export default CreateRecoredPage;
