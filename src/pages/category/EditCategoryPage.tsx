import { Box, Container } from '@mui/system';
import { TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

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
import {
  currentPopupMessageType,
  popupMessageText,
  stepButtonProps,
} from '@/store/common';
import { buttonText, modalAnswer } from '@/constants/message';
import { popupShowState, popupSuccessState } from '@/store/popupMessage';
import { modalState } from '@/store/modal';
import { useModalCommon } from '@/hooks/modalCommon';

const EditCategoryPage = () => {
  const { closeModal } = useModalCommon();
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  const selectedMainCategory = useRecoilValue(selectedMainCategoryState);
  const selectedSubCategory = useRecoilValue(selectedSubCategoryState);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);

  const setIsPopupShow = useSetRecoilState(popupShowState);
  const setIsSuccessPopup = useSetRecoilState(popupSuccessState);
  const setPopupText = useSetRecoilState(popupMessageText);
  const setPopupMessageType = useSetRecoilState(currentPopupMessageType);

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
    setModalInfo({
      open: true,
      title: '카테고리 이름 및 아이콘을 수정하면 통계도 동일하게 반영됩니다.',
      msg: '그래도 변경하시겠습니까?',
      btn1Text: modalAnswer.no,
      btn1ClickHandler: closeModal,
      btn2Text: modalAnswer.yes,
      btn2ClickHandler: async () => {
        closeModal();
        const iconFile = selectedIcon.iconFile;
        if (isInputNameEmpty || !iconFile.filename) {
          return true;
        }

        let response;
        let popupText: string = '';
        if (mode === 'add') {
          response = await addSubCategory({
            mainCategoryId: selectedMainCategory.categoryId,
            color: selectedMainCategory.color,
            highlightColor: selectedMainCategory.highlightColor,
            name: inputName,
            iconId: iconFile.id,
          });
          popupText = '카테고리가 추가되었습니다.';
        } else {
          popupText = '카테고리가 수정되었습니다.';
          const categoryId = selectedSubCategory.categoryId;
          if (categoryId) {
            const iconName = iconFile.filename;
            const name = inputName;
            if (
              iconName === iconFile.filename &&
              name === selectedSubCategory.name
            ) {
              navigation(-1);
              return true;
            }
            response = await updateSubCategory({
              categoryId,
              iconId: iconFile.id,
              name,
            });
          }
        }

        if (response?.status === 'SUCCESS') {
          navigation(-1);
        } else {
          popupText = '카테고리 설정에 실패했습니다.';
        }

        setPopupMessageType('CATEGORY');
        setIsPopupShow(() => true);
        setPopupText(popupText);
      },
    });
  };

  /**
   * handle delete event
   */
  const handleDelete = async () => {
    setModalInfo({
      open: true,
      title: '모두 삭제를 원하십니까?',
      msg: '총 00개의 기록이 있습니다.',
      btn1Text: '모두 삭제',
      btn1ClickHandler: closeModal,
      btn2Text: '다른 카테고리로 이동',
      btn2ClickHandler: async () => {
        closeModal();
        const response = await deleteCategory(selectedSubCategory.categoryId!);
        let popupText;
        if (response.status === 'SUCCESS') {
          popupText = '카테고리 삭제에 성공했습니다.';
          navigation(-1);
        } else {
          popupText = '카테고리 삭제에 실패했습니다.';
        }
        setPopupMessageType('CATEGORY');
        setIsPopupShow(() => true);
        setPopupText(popupText);
      },
    });
  };

  /**
   * get category data
   */
  const getCategoryData = async () => {
    const response = await getCategories();
    if (response.result) {
      setCategories(response.result);
    }
  };

  /**
   * get category icons
   * @returns
   */
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
    setIsSuccessPopup(true);
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
              {buttonText.prev}
            </Typography>
          }
          nextButtonIcon={
            <Typography
              sx={{
                color: isInputNameEmpty ? 'pink.700' : 'grey.500',
                fontSize: '13px',
              }}
            >
              {buttonText.complete}
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
