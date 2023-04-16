import {
  Button,
  Chip,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useSetRecoilState  } from 'recoil';

import { getCategories } from '../../api/category.api';
import { addRecord } from '../../api/record.api';

import Circle from '@/components/common/Circle';
import FlexBox from '@/components/common/FlexBox';
import DaysChip from '@/components/date/DaysChip';
import CommonHeader from '@/components/layout/CommonHeader';
import { categoriesState, selectedDaysState, recoilCategory, recoilSubCategory, selectedTimeRangeState } from '@/store/record';

export interface MainCategory {
  categoryId: number;
  name: string;
  level?: number;
  color: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  categoryId?: number;
  name: string;
  color: string;
  mainCategoryId?: number;
}

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
  // const setSelectedSubCategory = useSetRecoilState<SubCategory>(
  //   selectedSubCategoryState,
  // );
  const [categories, setCategories] = useState<MainCategory[]>([]);


  const selectedDate = useRecoilValue(selectedTimeRangeState);
  const [selectedDays, setSelectedDays] = useRecoilState(selectedDaysState);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedSubCategoryIdx, setSelectedSubCategoryIdx] = useState(0);

  const [recoilCategoryValue, setRecoilCategoryValue] = useRecoilState(recoilCategory);
  const [recoilSubCategoryValue, setRecoilSubCategoryValue] = useRecoilState(recoilSubCategory);


  //카테고리 API 요청
  const getAllCategories = async () => {
    const response = await getCategories();
    if (response.result) {
      setCategories(response.result);
    } else {
      alert('Error');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

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
  const navigate = useNavigate();

  
  //시간소비 활동 API - 등록
  async function postData(name: string, startedAt: string, finishedAt: string): Promise<{
    categoryId: number;
    name: string;
    fromStartedAt: string;
    toStartedAt: string;
    timeUnit: number;
} | undefined> {
    const newRecord = {
        categoryId: selectedCategoryIdx + 1,
        name,
        startedAt,
        finishedAt,
        timeUnit: 30,
    };

    const response = await addRecord(newRecord);
    if (response.ok && 'result' in response) {
        const { categoryId, name, startedAt, finishedAt, timeUnit } = response.result;
        return {
            categoryId,
            name,
            fromStartedAt: startedAt,
            toStartedAt: finishedAt,
            timeUnit,
        };
    } else {
        console.log("에러 발생");
        return undefined;
    }
}

function handleRightButtonClick() {
    const name = categories[selectedCategoryIdx].name;
    const startedAt = formatDate(selectedDate.start);
    const finishedAt = formatDate(selectedDate.end);

    postData(name, startedAt, finishedAt);
    navigate("/record");
}

  
  
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
        <Button variant="text" component={Link} to="/category">
            카테고리 설정
          </Button>
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
              <Circle
              key={sub.name}
              label={sub.name}
              variant={selectedSubCategoryIdx === idx ? 'filled' : 'outlined'}
              color={sub.color}
              size={40}
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