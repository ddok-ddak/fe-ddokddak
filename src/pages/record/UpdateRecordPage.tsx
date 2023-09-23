import {
    //Box,
    Button,
    Chip,
    Container,
    //createStyles,
    Divider,
    TextField,
    //Theme,
    Typography,
    //useTheme,
  } from '@mui/material';
  import { ReactElement, useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useRecoilValue, useRecoilState } from 'recoil';
  
  import Circle from '@/components/common/Circle';
  import FlexBox from '@/components/common/FlexBox';
  //import DaysChip from '@/components/date/DaysChip';
  import CommonHeader from '@/components/layout/CommonHeader';
  import { MainCategory } from '@/pages/category/CategoryPage';
  import { recoilCategory, recoilSubCategory, selectedTimeRangeState } from '@/store/record';
  import { getCategories } from '../../api/category.api';
  import { addRecord } from '@/api/record.api';

  // import styles from './CreateRecordPage.module.css';
  
  export interface SelectedRangeData {
    start: Date;
    end: Date;
  }

  const getAMPM = (date: Date) => {
    const hours = date.getHours();
    const ampm = hours > 12 ? 'PM' : 'AM';
    return ampm;
  };
  interface EventEditProps {
    start: Date;
    end: Date;
    title: string;
  }
  
  
  const UpdateRecoredPage = (): ReactElement => {
    const selectedDate = useRecoilValue(selectedTimeRangeState);
    const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
    const [selectedSubCategoryIdx, setSelectedSubCategoryIdx] = useState(0);
  
    const [recoilCategoryValue, setRecoilCategoryValue] = useRecoilState(recoilCategory);
    const [recoilSubCategoryValue, setRecoilSubCategoryValue] = useRecoilState(recoilSubCategory);
  
    const [categories, setCategories] = useState<MainCategory[]>([]);

    const getAllCategories = async () => {
      const response = await getCategories();
      if (response.result) {
        // console.table(response.result)
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
    const postData = async () => {
      
      const response = await addRecord({
        startedAt: formatDate(selectedDate.start),
        finishedAt: formatDate(selectedDate.end),
        name: "test-activity",
      });

      if (response.status === 'SUCCESS') {
        navigate('/record'); // 페이지 이동
      } else {
        console.log('error');
      }
      const data = await JSON.stringify(response);
      console.log(data);
    };
  
    function removeKST(str: string): string {
      return str.replace(/ KST$/, '');
    }
  
    ////로컬에 저장
    const handleRecordCreate = (): void =>  {
      // localStorage.clear();
      const events = JSON.parse(localStorage.getItem('events') || '[]');
    
      const newEvent = {
        id: String(events.length),
        title: String(recoilCategoryValue),
        start: removeKST(formatDate(selectedDate.start)),
        end: removeKST(formatDate(selectedDate.end))
      };
    
      events.push(newEvent);
      localStorage.setItem('events', JSON.stringify(events));
      console.log(events);
      navigate('/record');
    };
  
    return (
      <>
        <CommonHeader title={'수정하기'} isShowBackButton={true} isShowRightButton={true}
        // onClickRightButton={postData}/>
        onClickRightButton={handleRecordCreate}/>
        <Container>
          {/* <Container
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '8px',
            }}
          >
            <DaysChip title="일" />
            <DaysChip title="월" />
            <DaysChip title="화" />
            <DaysChip title="수" />
            <DaysChip title="목" />
            <DaysChip title="금" />
            <DaysChip title="토" />
          </Container> */}
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
            {() => {
              console.log(categories[selectedCategoryIdx])
              return (<div></div>);
            }}
            {/* {categories &&
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
              ))} */}
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
          <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          삭제하기
        </Button>
        </Container>
      </>
    );
  };
  
  export default UpdateRecoredPage;
  