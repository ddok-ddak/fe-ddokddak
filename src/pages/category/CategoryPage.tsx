import {
  Container,
  Divider,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Circle from '../../components/common/Circle';
import FolderTop from '../../components/common/FolderTop';
import Spacer from '../../components/common/Spacer';
import CommonHeader from '../../components/layout/CommonHeader';
import {
  CategoryViewType,
  categoryViewMode,
  selectedMainCategoryState,
  selectedSubCategoryState,
} from '../../store/category';
import Wrapper from '../auth/common/Wrapper';

import { currentUserInfo } from '@/store/info';
import { getCategories } from '@/api/category.api';
import { modalState } from '@/store/modal';
import { modalAnswer } from '@/constants/message';
import { UserData, UserTemplateType } from '@/api/auth';

export interface MainCategoryProps {
  highlightColor?: string | undefined;
  categoryId: number;
  name: string;
  level?: number;
  color: string;
  subCategories: SubCategoryProps[];
}

export interface SubCategoryProps {
  mainCategoryId?: number;
  categoryId?: number;
  name: string;
  iconFile: iconFileProps;
  color?: string;
  highlightColor?: string;
}

export interface iconFileProps {
  filename?: string;
  iconGroup?: string;
  id?: number;
  originalFilename?: string;
  path?: string;
}
// 사용자 모드
export interface ModeProps {
  id: string;
  type: UserTemplateType;
  name: string;
  modalTitle: string;
  modalMsg: string;
}

export const UserModeList: ModeProps[] = [
  {
    id: 'unemployed',
    type: 'UNEMPLOYED',
    name: '일반인',
    modalTitle: '일반인 모드 선택 시 기존 데이터가 삭제됩니다.',
    modalMsg:
      '학업, 직장 카테고리와 데이터가 삭제됩니다. 그래도 변경 하시겠습니까?',
  },
  {
    id: 'worker',
    type: 'WORKER',
    name: '직장인',
    modalTitle: '직장인 모드 선택 시 기존 데이터가 삭제됩니다.',
    modalMsg:
      '학업 카테고리와 데이터가 삭제되고 직장 카테고리가 새롭게 추가됩니다. 그래도 변경 하시겠습니까?',
  },
  {
    id: 'student',
    type: 'STUDENT',
    name: '학생',
    modalTitle: '학생 모드 선택 시 기존 데이터가 삭제됩니다.',
    modalMsg:
      '직장 카테고리와 데이터가 삭제되고 학업 카테고리가 새롭게 추가됩니다. 그래도 변경 하시겠습니까?',
  },
];

const CategoryPage = () => {
  const navigation = useNavigate();
  const setSelectedMainCategory = useSetRecoilState<MainCategoryProps>(
    selectedMainCategoryState,
  );
  const setSelectedSubCategory = useSetRecoilState<SubCategoryProps>(
    selectedSubCategoryState,
  );

  const setUserInfo = useSetRecoilState<UserData>(currentUserInfo);
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const categoryMode = useRecoilValue<CategoryViewType>(categoryViewMode);

  const [categories, setCategories] = useState<MainCategoryProps[]>([]);
  const [currentUserMode, setCurrentUserMode] = useState<ModeProps>();

  const getUserInfo = () => {
    const data: UserData = { email: '', nickname: '', templateType: 'STUDENT' };
    setUserInfo(data);
    setCurrentUserMode(
      UserModeList.filter((userMode: ModeProps) => {
        return userMode.type === data.templateType;
      })[0],
    );
  };

  /**
   * get category list
   */
  const getAllCategories = async () => {
    const response = await getCategories();
    if (response.status === 'SUCCESS') {
      setCategories(response.result);
    } else {
      alert('Error');
    }
  };

  const getCategoryIcon = (sub: SubCategoryProps) => {
    return (
      <Circle
        label={sub.name}
        labelSize={'10px'}
        color={sub.color}
        size={40}
        onClick={() => {
          const category = categories.filter(
            (category) => category.categoryId === sub.mainCategoryId,
          )[0];
          sub.highlightColor = category.color;
          setSelectedMainCategory(category);
          setSelectedSubCategory(sub);
          navigation('/category/edit', {
            state: {
              mode: 'edit',
            },
          });
        }}
        iconSize={40}
        iconName={sub.iconFile.filename?.split('.')[0] || ''}
      />
    );
  };

  useEffect(() => {
    getUserInfo();
    getAllCategories();
  }, []);

  const setWarningModal = (mode: ModeProps) => {
    setModalInfo({
      open: true,
      title: mode?.modalTitle || '',
      msg: mode?.modalMsg || '',
      btn1Text: modalAnswer.no,
      btn1ClickHandler: () => {
        setModalInfo({ ...modalInfo, open: false });
      },
      btn2Text: modalAnswer.yes,
      btn2ClickHandler: () => {
        setModalInfo({ ...modalInfo, open: false });
        // TODO: delete category and date, create new category, change user data template mode
      },
    });
  };

  return (
    <Wrapper
      headerComp={
        <CommonHeader title={'카테고리 설정하기'} isShowPrevButton={true} />
      }
    >
      <Spacer y={20} />

      <Box sx={{ display: categoryMode === 'MODEVISIBLE' ? '' : 'none' }}>
        <Container>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '600',
              m: '10px 0',
            }}
          >
            {'현재 모드'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            {UserModeList.map((mode, idx) => {
              const type = mode.type;
              return (
                <RadioGroup key={idx}>
                  <Circle
                    label={`${mode.name} 모드`}
                    labelSize="13px"
                    color="pink.300"
                    size={63}
                    iconSize={41}
                    iconName={mode.id}
                  />
                  <Radio
                    size="small"
                    checked={currentUserMode?.type === type}
                    color="default"
                    value={type}
                    onClick={() => {
                      setCurrentUserMode(mode);
                      setWarningModal(mode);
                    }}
                    sx={{
                      span: {
                        position: 'absolute',
                        top: '0px',
                      },
                      '& .MuiSvgIcon-root ': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '15px',
                        height: '15px',
                      },
                      '& .MuiSvgIcon-root:first-of-type ': {
                        color: 'grey.700',
                      },
                      '& .MuiSvgIcon-root:last-of-type ': {
                        color: 'pink.700',
                      },
                    }}
                  />
                </RadioGroup>
              );
            })}
          </Box>
        </Container>
        <Spacer y={27} />
      </Box>

      <Divider
        sx={{
          width: '100vw',
          height: '3px',
          backgroundColor: 'chart.customBackground',
          border: 'none',
        }}
      />

      <Spacer y={27} />

      <Container>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            m: '10px 0',
          }}
        >
          {'카테고리 설정'}
        </Typography>

        {categories.length &&
          categories?.map((category, idx) => {
            return (
              <Box
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box>
                  <FolderTop color={category.color} />
                  <Typography
                    sx={{
                      position: 'absolute',
                      left: 'calc(50% - 130px)',
                      marginTop: '-166px',
                      marginLeft: '-10px',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold',
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    padding: '16px',
                    paddingTop: '50px',
                    width: '299px',
                    margin: 'auto',
                  }}
                  key={category.name}
                >
                  <Grid container gap={1} sx={{ padding: '15px 0px' }}>
                    {category.subCategories.map((sub, subIdx) => {
                      if (subIdx < 5) {
                        return (
                          <Grid item key={subIdx} width="50px">
                            {getCategoryIcon(sub)}
                          </Grid>
                        );
                      }
                      return <></>;
                    })}
                    {category.subCategories.length < 5 && (
                      <Grid item width="60px">
                        <Circle
                          label="추가"
                          labelSize={'10px'}
                          color={category.color}
                          size={40}
                          iconSize={40}
                          iconName={'add'}
                          onClick={() => {
                            setSelectedMainCategory(category);
                            setSelectedSubCategory({ name: '', iconFile: {} });
                            navigation('/category/edit', {
                              state: {
                                mode: 'add',
                              },
                            });
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Box>
                <Spacer y={20} />
              </Box>
            );
          })}
      </Container>
      <Spacer y={12} />
    </Wrapper>
  );
};

export default CategoryPage;
