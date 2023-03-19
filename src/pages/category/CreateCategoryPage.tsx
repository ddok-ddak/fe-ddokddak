import { Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import Circle from '../../components/common/Circle';
import Spacer from '../../components/common/Spacer';
import CommonHeader from '../../components/layout/CommonHeader';
import { categories } from '../../store/tempData';
import AddIcon from '@mui/icons-material/Add';

export interface MainCategory {
  title: string;
  color: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  title: string;
  color: string;
}

const CreateCategoryPage = () => {
  const [selectedSubCategoryIdx, setSelectedSubCategoryIdx] = useState(0);

  return (
    <>
      <CommonHeader title={'카테고리 추가하기'} isShowBackButton={true} />
      <Box padding={5}>
        <Box sx={{ display: 'flex', alignItems: ' center' }}>
          <Typography variant="body1">카테고리이름</Typography>
          <Spacer x={24} />
          <TextField variant="standard" />
        </Box>
        <Spacer y={16} />
        <Box sx={{ display: 'flex', alignItems: ' center' }}>
          <Typography variant="body1">색상</Typography>
          <Spacer x={24} />
          <Circle color={'#dddddd'} size={40} />
        </Box>
      </Box>
    </>
  );
};

export default CreateCategoryPage;
