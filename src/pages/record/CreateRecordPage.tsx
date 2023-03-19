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
import { ReactElement, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import DaysChip from '../../components/date/DaysChip';
import FlexBox from '../../components/common/FlexBox';
import CommonHeader from '../../components/layout/CommonHeader';
import { selectedTimeRangeState } from '../../store/record';
import { MainCategory } from '../category/CategoryPage';
// import styles from './CreateRecordPage.module.css';
import Circle from '../../components/common/Circle';
import { categories } from '../../store/tempData';

export interface SelectedRangeData {
  start: Date;
  end: Date;
}

const getAMPM = (date: Date) => {
  const hours = date.getHours();
  const ampm = hours > 12 ? 'PM' : 'AM';
  return ampm;
};

const CreateRecoredPage = (): ReactElement => {
  const selectedDate = useRecoilValue(selectedTimeRangeState);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedSubCategoryIdx, setSelectedSubCategoryIdx] = useState(0);

  useEffect(() => {
    setSelectedSubCategoryIdx(0);
  }, [selectedCategoryIdx]);

  return (
    <>
      <CommonHeader title={'기록하기'} isShowBackButton={true} />
      <Container>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '8px',
          }}
        >
          <DaysChip title="일" isSelected={selectedDate.start.getDay() === 0} />
          <DaysChip title="월" isSelected={selectedDate.start.getDay() === 1} />
          <DaysChip title="화" isSelected={selectedDate.start.getDay() === 2} />
          <DaysChip title="수" isSelected={selectedDate.start.getDay() === 3} />
          <DaysChip title="목" isSelected={selectedDate.start.getDay() === 4} />
          <DaysChip title="금" isSelected={selectedDate.start.getDay() === 5} />
          <DaysChip title="토" isSelected={selectedDate.start.getDay() === 6} />
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
                key={category.title}
                label={category.title}
                variant="filled"
                color="primary"
                size="medium"
                onClick={() => setSelectedCategoryIdx(idx)}
              />
            ) : (
              <Chip
                key={category.title}
                label={category.title}
                variant="outlined"
                size="medium"
                onClick={() => setSelectedCategoryIdx(idx)}
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
