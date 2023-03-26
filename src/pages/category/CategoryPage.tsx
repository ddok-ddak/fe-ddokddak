import { Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import Circle from '../../components/common/Circle';
import Spacer from '../../components/common/Spacer';
import CommonHeader from '../../components/layout/CommonHeader';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import FolderTop from '../../components/common/FolderTop';
import { useSetRecoilState } from 'recoil';
import { selectedSubCategoryState } from '../../store/category';
import { getCategories } from '../../api/category.api';

export interface MainCategory {
  id: number;
  title: string;
  color: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id?: number;
  title: string;
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
    if (response.successOrNot === 'Y') {
      setCategories(response.data);
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
                  {category.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: '16px 32px',
                  backgroundColor: '#f2f2f2',
                  width: '267px',
                  margin: 'auto',
                }}
                key={category.title}
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

                <Grid container gap={3} sx={{ padding: '20px 0px' }}>
                  {categories[idx].subCategories.map((sub, subIdx) => (
                    <Grid item key={subIdx}>
                      <Circle
                        label={sub.title}
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
                  <Grid item>
                    <Circle
                      label="추가"
                      color={'#dddddd'}
                      size={40}
                      onClick={() => {
                        setSelectedSubCategory({
                          color: '#D9D9D9',
                        } as SubCategory);
                        navigation('/category/add', {
                          state: {
                            mode: 'add',
                          },
                        });
                      }}
                    >
                      <AddIcon fontSize="large" sx={{ margin: '2.5px' }} />
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
