import { Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import Circle from '../../components/common/Circle';
import Spacer from '../../components/common/Spacer';
import CommonHeader from '../../components/layout/CommonHeader';
import { categories } from '../../store/tempData';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export interface MainCategory {
  title: string;
  color: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  title: string;
  color: string;
}

const CategoryPage = () => {
  const navigation = useNavigate();
  return (
    <>
      <CommonHeader title={'카테고리 설정하기'} isShowBackButton={true} />
      <Spacer y={12} />
      {categories?.map((category, idx) => {
        return (
          <Box sx={{ padding: '16px 32px' }} key={category.title}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5">{category.title}</Typography>
              <Spacer x={16} />
              <Box
                sx={{
                  width: '56px',
                  height: '20px',
                  backgroundColor: `${category.color}`,
                }}
              ></Box>
            </Box>

            <Grid container gap={3} sx={{ padding: '20px 0px' }}>
              {categories[idx].subCategories.map((sub, subIdx) => (
                <Grid item key={subIdx}>
                  <Circle
                    key={subIdx}
                    label={sub.title}
                    color={sub.color}
                    size={40}
                    // onClick={() => {}}
                  />
                </Grid>
              ))}
              <Grid item>
                <Circle
                  label="추가"
                  color={'#dddddd'}
                  size={40}
                  onClick={() => {
                    navigation('/category/add');
                  }}
                >
                  <AddIcon fontSize="large" sx={{ margin: '2.5px' }} />
                </Circle>
              </Grid>
            </Grid>
            <Divider />
          </Box>
        );
      })}
      <Spacer y={12} />
    </>
  );
};

export default CategoryPage;
