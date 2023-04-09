import {
  Button,
  Chip,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';

import FlexBox from '@/components/common/FlexBox';
import DaysChip from '@/components/date/DaysChip';
import CommonHeader from '@/components/layout/CommonHeader';
import { categoriesState, selectedDaysState, recoilCategory, recoilSubCategory, selectedTimeRangeState } from '@/store/record';

export interface SelectedRangeData {
  start: Date;
  end: Date;
}

const getAMPM = (date: Date) => {
  const hours = date.getHours();
  const ampm = hours > 12 ? 'PM' : 'AM';
  return ampm;
};


const CreateRecordPage= (): ReactElement => {
  const [categories, setCategories] = useRecoilState(categoriesState);

  const selectedDate = useRecoilValue(selectedTimeRangeState);
  const [selectedDays, setSelectedDays] = useRecoilState(selectedDaysState);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedSubCategoryIdx, setSelectedSubCategoryIdx] = useState(0);

  const [recoilCategoryValue, setRecoilCategoryValue] = useRecoilState(recoilCategory);
  const [recoilSubCategoryValue, setRecoilSubCategoryValue] = useRecoilState(recoilSubCategory);


  //카테고리 API 요청해서 렌더링
  useEffect(() => {
    const fetchCategories = async () => {
      const memberId = 1;
      const res = await fetch(`http://localhost:8080/api/v1/categories?memberId=${encodeURIComponent(memberId)}`);
      const data = await res.json();
      setCategories(data.result);
    }
    fetchCategories();
    
  }, [setCategories]);

  console.log("categories: ",categories);
  //
  useEffect(() => {
    setSelectedSubCategoryIdx(0);
  }, [selectedCategoryIdx]);

  //선택한 메인카테고리, sub카테고리 recoil에 저장
  useEffect(() => {
    setSelectedSubCategoryIdx(0);
    setRecoilCategoryValue(selectedCategoryIdx);
  }, [selectedCategoryIdx, setRecoilCategoryValue]);

  useEffect(() => {
    setRecoilSubCategoryValue(selectedSubCategoryIdx);
  }, [selectedSubCategoryIdx, setRecoilSubCategoryValue]);
  console.log(recoilCategoryValue, recoilSubCategoryValue);

  // 날짜 형식 2023-01-01T13:00:00 KST으로 포맷
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
  async function postData(name: string, startedAt: string, finishedAt: string): Promise<{
    categoryId: number;
    name: string;
    startedAt: string;
    finishedAt: string;
    timeUnit: number;
  }> {

    const newEvents = {
      categoryId: selectedCategoryIdx+1,
      name,
      startedAt,
      finishedAt,
      timeUnit: 30,
    };
  
    const res = await fetch("http://localhost:8080/api/v1/activity-records?memberId=1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Host": "localhost:8080",
      },
      body: JSON.stringify(newEvents),
    });
  
    if (res.ok) {
      setSelectedDays([]);
      navigate("/record");
    } else {
      console.log("에러 발생");
    }
  
    const data = await res.json();
    return {
      categoryId: data.categoryId,
      name: data.name,
      startedAt: data.startedAt,
      finishedAt: data.finishedAt,
      timeUnit: data.timeUnit,
    };
  };

  console.log("categories: ", categories);
  console.log("selectedCategoryIdx: ",selectedCategoryIdx);
  console.log("categories[selectedCategoryIdx]?.subCategories: ", categories[selectedCategoryIdx]?.subCategories);


  //요일 여러개 선택
  const handleDayChipClick = (dayIndex: number) => {
    if (selectedDays.includes(dayIndex)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== dayIndex));
    } else {
      setSelectedDays([...selectedDays, dayIndex]);
    }
    return selectedDays;
  };

  function handleRightButtonClick() {
    const name = categories[selectedCategoryIdx].name;
    const startedAt = formatDate(selectedDate.start);
    const finishedAt = formatDate(selectedDate.end);
    postData(name, startedAt, finishedAt);
  }
  return (
    <>
      <CommonHeader title={'기록하기'} isShowBackButton={true} isShowRightButton={true} onClickRightButton={handleRightButtonClick}/>
      <Container>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '8px',
          }}
        >
          <DaysChip title="일" isSelected={selectedDate.start.getDay() === 0 || selectedDays.includes(0)} onClick={() => handleDayChipClick(0)} />
          <DaysChip title="월" isSelected={selectedDate.start.getDay() === 1 || selectedDays.includes(1)} onClick={() => handleDayChipClick(1)} />
          <DaysChip title="화" isSelected={selectedDate.start.getDay() === 2 || selectedDays.includes(2)} onClick={() => handleDayChipClick(2)} />
          <DaysChip title="수" isSelected={selectedDate.start.getDay() === 3 || selectedDays.includes(3)} onClick={() => handleDayChipClick(3)} />
          <DaysChip title="목" isSelected={selectedDate.start.getDay() === 4 || selectedDays.includes(4)} onClick={() => handleDayChipClick(4)} />
          <DaysChip title="금" isSelected={selectedDate.start.getDay() === 5 || selectedDays.includes(5)} onClick={() => handleDayChipClick(5)} />
          <DaysChip title="토" isSelected={selectedDate.start.getDay() === 6 || selectedDays.includes(6)} onClick={() => handleDayChipClick(6)} />

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
              key={category.name}
              label={category.name}
                variant="filled"
                color="primary"
                size="medium"
                onClick={() => {
                  setSelectedCategoryIdx(idx);
                  setSelectedSubCategoryIdx(0);
                }}
              />
            ) : (
              <Chip
                key={category.name}
                label={category.name}
                variant="outlined"
                size="medium"
                onClick={() => {
                  setSelectedCategoryIdx(idx);
                  setSelectedSubCategoryIdx(0);
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
          {categories[selectedCategoryIdx]?.subCategories.map((sub, idx) => (
              <Chip
                key={sub.name}
                label={sub.name}
                variant={selectedSubCategoryIdx === idx ? 'filled' : 'outlined'}
                size="medium"
                onClick={() => {
                  setSelectedSubCategoryIdx(idx);
                }}
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
export default CreateRecordPage;