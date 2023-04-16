import AddIcon from '@mui/icons-material/Add';
import { Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { getCategories } from '../../api/category.api';
import Circle from '../../components/common/Circle';
import FolderTop from '../../components/common/FolderTop';
import Spacer from '../../components/common/Spacer';
import CommonHeader from '../../components/layout/CommonHeader';
import { selectedSubCategoryState } from '../../store/category';

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

const CategoryPage = () => {
  const navigation = useNavigate();
  const setSelectedSubCategory = useSetRecoilState<SubCategory>(
    selectedSubCategoryState,
  );
  const [categories, setCategories] = useState<MainCategory[]>([]);

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

  return (
    <>
      <CommonHeader title={'카테고리 설정하기'} isShowBackButton={true} />
      <Spacer y={20} />
      <Box>
        {categories?.map((category, idx) => {
          return (
            <Box key={idx}>
              <Box>
                <FolderTop color={category.color} />
                <Typography
                  sx={{
                    position: 'absolute',
                    left: 'calc(50% - 130px)',
                    marginTop: '-30px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: '16px',
                  backgroundColor: '#f2f2f2',
                  width: '299px',
                  margin: 'auto',
                }}
                key={category.name}
              >
                {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5">{category.title}</Typography>
                  <Spacer x={16} />
                  <Box
                    sx={{
                      width: '56px',
                      height: '20px',
                      backgroundColor: `${category.color}`,
                    }}
                  ></Box>
                </Box> */}

                <Grid container gap={2} sx={{ padding: '15px 0px' }}>
                  {categories[idx].subCategories.map((sub, subIdx) => (
                    <Grid item key={subIdx} width="60px">
                      <Circle
                        label={sub.name}
                        color={sub.color}
                        size={40}
                        onClick={() => {
                          setSelectedSubCategory(sub);
                          navigation('/category/add', {
                            state: {
                              mode: 'edit',
                            },
                          });
                        }}
                      />
                    </Grid>
                  ))}
                  <Grid item width="60px">
                    <Circle
                      label="추가"
                      color={categories[idx].subCategories[0].color}
                      size={40}
                      onClick={() => {
                        setSelectedSubCategory({
                          mainCategoryId: category.categoryId,
                          color: '#D9D9D9',
                        } as SubCategory);
                        navigation('/category/add', {
                          state: {
                            mode: 'add',
                          },
                        });
                      }}
                    >
                      <AddIcon
                        fontSize="large"
                        sx={{ margin: '2.5px', color: 'white' }}
                      />
                    </Circle>
                  </Grid>
                </Grid>
              </Box>
              <Spacer y={20} />
            </Box>
          );
        })}
      </Box>
      <Spacer y={12} />
    </>
  );
};

export default CategoryPage;
