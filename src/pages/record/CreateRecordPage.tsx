import {
  Button,
  Chip,
  ChipProps,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState} from 'recoil';

import { getCategories } from '../../api/category.api';
import { addRecord } from '../../api/record.api';

import { addDays } from 'date-fns';
import { styled } from '@mui/material/styles';
import Circle from '@/components/common/Circle';
import FlexBox from '@/components/common/FlexBox';
import DaysChip from '@/components/date/DaysChip';
import CommonHeader from '@/components/layout/CommonHeader';
import { selectedDaysState, recoilCategory, recoilSubCategory, selectedTimeRangeState } from '@/store/record';

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

interface StyledChipProps extends ChipProps{
  isselected: boolean;
  variant: 'filled' | 'outlined';
  backgroundColor: string;
  onClick?: () => void;
}

const StyledChip = styled(Chip)<StyledChipProps>(({ theme, isselected, backgroundColor }) => ({
  marginRight: '16px',
  marginBottom: '16px',
  minWidth: '95px',
  minHeight: '50px',
  borderRadius: '50px',
  cursor: 'grab',
  '&:hover': {
    backgroundColor: isselected ? backgroundColor : theme.palette.action.hover,
    cursor: 'grabbing',
  },
  backgroundColor: isselected ? backgroundColor : 'transparent',
}));


const CreateRecordPage= (): ReactElement => {
  const [categories, setCategories] = useState<MainCategory[]>([]);


  const selectedDate = useRecoilValue(selectedTimeRangeState);
  const [selectedDays, setSelectedDays] = useRecoilState(selectedDaysState);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedSubCategoryIdx, setSelectedSubCategoryIdx] = useState(0);

  const [recoilCategoryValue, setRecoilCategoryValue] = useRecoilState(recoilCategory);
  const [recoilSubCategoryValue, setRecoilSubCategoryValue] = useRecoilState(recoilSubCategory);


// 초기 선택된 요일을 state에 저장
useEffect(() => {
  const getInitialSelectedDays = (): number[] => {
    const dayIndex = selectedDate.start.getDay();
    return [dayIndex];
  };
  
  const initialSelectedDays = getInitialSelectedDays();
  setSelectedDays(initialSelectedDays);
}, [selectedDate.start, setSelectedDays]);

  //카테고리 API 요청
  const getAllCategories = async () => {
    const response = await getCategories();
    if (response.result) {
      setCategories(response.result);
      //console.log(response.result.color);
      //console.log(response.result.categoryId);
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


  // 선택한 메인카테고리, sub카테고리 recoil에 저장
  useEffect(() => {
    setSelectedSubCategoryIdx(0);
    setRecoilCategoryValue(selectedCategoryIdx);
  }, [selectedCategoryIdx, setRecoilCategoryValue, recoilCategoryValue]);

  useEffect(() => {
    setRecoilSubCategoryValue(selectedSubCategoryIdx);
  }, [selectedSubCategoryIdx, setRecoilSubCategoryValue, recoilCategoryValue]);

  // 날짜 형식 2023-01-01T13:00:00 KST으로 포맷
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
  
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')} KST`;
  }
  const navigate = useNavigate();

  
  //시간소비 활동 API - 등록
  async function postData(
    name: string,
    startedAt: string,
    finishedAt: string
  ): Promise<{
    categoryId: number;
    name: string;
    startedAt: string;
    finishedAt: string;
    timeUnit: number;
  } | undefined> {
    const newRecord = {
      categoryId: categories[selectedCategoryIdx].subCategories[selectedSubCategoryIdx].categoryId,
      name,
      startedAt,
      finishedAt,
      timeUnit: 30,
    };
    
    const response = await addRecord(newRecord);
    console.log(response);
    
    if (response.result) {
      const { categoryId, name, startedAt, finishedAt, timeUnit } = response.result;
      setSelectedDays([]);
      navigate("/record");
      return {
        categoryId,
        name,
        startedAt,
        finishedAt,
        timeUnit,
      };
    } else {
      console.log("에러 발생");
      return undefined;
    }
  }
  
  async function postAllDays(name: string, startedAt: string, finishedAt: string, selectedDays: number[]): Promise<void> {
    for (const dayIndex of selectedDays) {
      const startedAtOfDay = formatDate(new Date(addDays(selectedDate.start, dayIndex - selectedDays[0])));
      const finishedAtOfDay = formatDate(new Date(addDays(selectedDate.end, dayIndex - selectedDays[0])));
      await postData(name, startedAtOfDay, finishedAtOfDay);
    }
  }

function handleRightButtonClick() {
  const name = categories[selectedCategoryIdx]?.subCategories[selectedSubCategoryIdx]?.name;
  const startedAt = formatDate(selectedDate.start);
  const finishedAt = formatDate(selectedDate.end);

  postAllDays(name, startedAt, finishedAt, selectedDays);
}

// 요일 여러개 선택
const handleDayChipClick = (dayIndex: number) => {
  if (selectedDays.includes(dayIndex)) {
    setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== dayIndex));
  } else {
    setSelectedDays([...selectedDays, dayIndex]);
  }
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
        <DaysChip title="일" isselected={selectedDate.start.getDay() === 0 || selectedDays.includes(0)} onClick={() => handleDayChipClick(0)} underline={new Date().getDay() === 0} />
        <DaysChip title="월" isselected={selectedDate.start.getDay() === 1 || selectedDays.includes(1)} onClick={() => handleDayChipClick(1)} underline={new Date().getDay() === 1} />
        <DaysChip title="화" isselected={selectedDate.start.getDay() === 2 || selectedDays.includes(2)} onClick={() => handleDayChipClick(2)} underline={new Date().getDay() === 2} />
        <DaysChip title="수" isselected={selectedDate.start.getDay() === 3 || selectedDays.includes(3)} onClick={() => handleDayChipClick(3)} underline={new Date().getDay() === 3} />
        <DaysChip title="목" isselected={selectedDate.start.getDay() === 4 || selectedDays.includes(4)} onClick={() => handleDayChipClick(4)} underline={new Date().getDay() === 4} />
        <DaysChip title="금" isselected={selectedDate.start.getDay() === 5 || selectedDays.includes(5)} onClick={() => handleDayChipClick(5)} underline={new Date().getDay() === 5} />
        <DaysChip title="토" isselected={selectedDate.start.getDay() === 6 || selectedDays.includes(6)} onClick={() => handleDayChipClick(6)} underline={new Date().getDay() === 6} />

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
        <Divider sx={{ bgcolor: '#FFDCE1', border: '2px solid #FFDCE1' }} />

        <Container sx={{ textAlign: 'right' }}>
        <Button variant="text" component={Link} to="/category" sx={{ color: '#949494', paddingTop: '17px' }}>
          카테고리 설정
        </Button>
          </Container>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              overflowX: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '-webkit-overflow-scrolling': 'touch',
              padding: '15px',
            }}
          >
            {categories.length && categories.map((category, idx) =>
              idx === selectedCategoryIdx ? (
                <StyledChip
                  key={category.name}
                  label={category.name}
                  variant="filled"
                  isselected={true}
                  backgroundColor={category.color}
                  onClick={() => {
                    setSelectedCategoryIdx(idx);
                    setSelectedSubCategoryIdx(0);
                  }}
                />
              ) : (
                <StyledChip
                  key={category.name}
                  label={category.name}
                  variant="outlined"
                  isselected={false}
                  backgroundColor='transparent'
                  onClick={() => {
                    setSelectedCategoryIdx(idx);
                    setSelectedSubCategoryIdx(0);
                  }}
                />
              )
            )}
          </Container>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            paddingBottom: '30px',
          }}
        >
          {categories[selectedCategoryIdx]?.subCategories.map((sub, idx) => (
              <Circle
              key={sub.name}
              label={sub.name}
              variant={selectedSubCategoryIdx === idx ? 'filled' : 'outlined'}
              color={sub.color}
              size={40}
              selected={selectedSubCategoryIdx === idx}
              onClick={() => {
                setSelectedSubCategoryIdx(idx);
              }}
            />
            ))}
        </Container>
        <Divider sx={{ bgcolor: '#FFDCE1', border: '3px solid #FFDCE1' }} />

        <Container sx={{ padding: '24px' }}>
          <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            placeholder="메모하기"
            variant="standard"
            fullWidth
          />
        </Container>
      </Container>      
    </>
  );
};
export default CreateRecordPage;