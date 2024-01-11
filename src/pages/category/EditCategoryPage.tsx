import { Box, Container } from '@mui/system';
import { TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  addSubCategory,
  deleteCategory,
  getCategories,
  updateSubCategory,
} from '../../api/category.api';
import Circle from '../../components/common/Circle';
import CommonHeader from '../../components/layout/CommonHeader';
import {
  selectedMainCategoryState,
  selectedSubCategoryState,
} from '../../store/category';
import { MainCategoryProps, SubCategoryProps } from './CategoryPage';
import Wrapper from '../auth/common/Wrapper';
import BottomButton from '@/components/common/BottomButton';
import { stepButtonProps } from '@/store/common';
import { buttonText } from '@/constants/message';

const EditCategoryPage = () => {
  const selectedMainCategory = useRecoilValue(selectedMainCategoryState);
  const selectedSubCategory = useRecoilValue(selectedSubCategoryState);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);

  const [inputName, setInputName] = useState(selectedSubCategory.name);
  const [isInputNameEmpty, setIsInputNameEmpty] = useState(true);
  const [isInputNameError, setIsInputNameError] = useState(false);
  const [selectedIcon, setSelectedIcon] =
    useState<SubCategoryProps>(selectedSubCategory);

  const [categories, setCategories] = useState<MainCategoryProps[]>([]);

  const navigation = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode ?? 'add';

  /**
   * handle save event
   */
  const handleSave = async () => {
    if (isInputNameEmpty || selectedIcon.iconFile.filename === '') {
      return true;
    }
    let response;
    if (mode === 'add') {
      response = await addSubCategory({
        mainCategoryId: selectedMainCategory.categoryId,
        color: selectedMainCategory.color,
        highlightColor: selectedMainCategory.highlightColor,
        name: inputName,
        iconId: selectedIcon.iconFile.id,
      });
    } else {
      const categoryId = selectedSubCategory.categoryId;
      if (categoryId) {
        const iconName = selectedIcon.iconFile.filename;
        const name = inputName;
        if (
          iconName === selectedSubCategory.iconFile.filename &&
          name === selectedSubCategory.name
        ) {
          navigation(-1);
          return true;
        }
        response = await updateSubCategory({
          categoryId,
          iconId: selectedIcon.iconFile.id,
          name,
        });
      }
    }
    if (response?.status === 'SUCCESS') {
      navigation(-1);
    } else {
      alert('Error');
    }
  };

  /**
   * handle delete event
   */
  const handleDelete = async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await deleteCategory(selectedSubCategory.categoryId!);
    if (response.status === 'SUCCESS') {
      alert('Successfully deleted');
      navigation(-1);
    } else {
      alert('Error');
    }
  };

  const getCategoryData = async () => {
    const response = await getCategories();
    if (response.result) {
      setCategories(response.result);
    }
  };

  const getCategoryIcon = () => {
    if (categories) {
      const categoryId = selectedIcon?.categoryId;
      return categories.map((category) => {
        const subCategories = category.subCategories;
        return subCategories.map((icon, idx) => {
          return (
            <Box sx={{ m: 1 }} key={idx}>
              <Circle
                selected={categoryId === icon.categoryId}
                color={selectedMainCategory.color}
                borderColor={selectedMainCategory.highlightColor}
                size={40}
                onClick={() => {
                  setSelectedIcon(icon);
                }}
                iconSize={40}
                iconName={icon.iconFile.filename?.split('.')[0] || ''}
              />
            </Box>
          );
        });
      });
    }
  };

  useEffect(() => {
    getCategoryData();
    setIsInputNameEmpty(!(mode === 'edit'));
    setNextButtonProps({
      ...nextButtonProps,
      text: buttonText.delete,
      isDisabled: false,
      clickHandler: handleDelete,
    });
  }, []);

  return (
    <Wrapper
      headerComp={
        <CommonHeader
          title={mode === 'edit' ? '카테고리 수정하기' : '카테고리 추가하기'}
          isShowPrevButton={true}
          isShowNextButton={true}
          prevButtonIcon={
            <Typography sx={{ color: 'grey.500', fontSize: '13px' }}>
              뒤로
            </Typography>
          }
          nextButtonIcon={
            <Typography
              sx={{
                color: isInputNameEmpty ? 'pink.700' : 'grey.500',
                fontSize: '13px',
              }}
            >
              완료
            </Typography>
          }
          onClickNextButton={handleSave}
        />
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          height: 'calc(100vh - 180px)',
          padding: '32px 16px',
        }}
      >
        <Container
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="body1"
            align="left"
            sx={{
              width: '100%',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              letterSpacing: '-0.35px',
            }}
          >
            카테고리 이름
          </Typography>
          <TextField
            variant="standard"
            placeholder="입력하기"
            fullWidth
            required={true}
            error={isInputNameError}
            defaultValue={inputName}
            onChange={(e) => {
              const value = e.target.value;
              setInputName(value);
              setIsInputNameEmpty(!!!value);
              setIsInputNameError(!!!value);
            }}
            sx={{
              fontSize: '17px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              letterSpacing: '-0.425px',
              textAlign: 'left',
              mt: 1,
            }}
          />
        </Container>
        <Container
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            mt: 3,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              width: '100%',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              letterSpacing: '-0.35px',
            }}
          >
            아이콘
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              p: 1,
            }}
          >
            {getCategoryIcon()}
          </Box>
        </Container>
      </Box>
      {mode === 'edit' && (
        <BottomButton
        btnStyleProps={{ borderRadius: '0px', flex: '0 0 5vh' }}
        textStyleProps={{}}
        />
      )}
    </Wrapper>
  );
};

export default EditCategoryPage;
