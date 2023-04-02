import AddIcon from '@mui/icons-material/Add';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { ColorResult, SwatchesPicker } from 'react-color';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  addSubCategory,
  deleteCategory,
  updateSubCategory,
} from '../../api/category.api';
import Circle from '../../components/common/Circle';
import Spacer from '../../components/common/Spacer';
import CommonHeader from '../../components/layout/CommonHeader';
import { selectedSubCategoryState } from '../../store/category';
import { categories } from '../../store/tempData';

const CreateCategoryPage = () => {
  const selectedSubCategory = useRecoilValue(selectedSubCategoryState);
  const [selectedColor, setSelectedColor] = useState(selectedSubCategory.color);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [inputName, setInputName] = useState(selectedSubCategory.name);
  const navigation = useNavigate();
  const location = useLocation();
  const mainCategoryId = selectedSubCategory.mainCategoryId;
  const mode = location.state?.mode ?? 'add';

  const onColorComplete = (
    color: ColorResult,
    // event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedColor(color.hex);
    setShowColorPicker(false);
  };

  const handleSave = async () => {
    console.log(selectedSubCategory);
    let response;
    if (mode === 'add') {
      response = await addSubCategory({
        mainCategoryId: selectedSubCategory.mainCategoryId,
        name: inputName,
        color: selectedColor,
      });
    } else {
      if (selectedSubCategory.categoryId) {
        response = await updateSubCategory({
          mainCategoryId: mainCategoryId,
          name: inputName,
          color: selectedColor,
          categoryId: selectedSubCategory.categoryId,
        });
      }
    }

    if (response?.successOrNot === 'Y') {
      alert('Successfully created');
      navigation(-1);
    } else {
      alert('Error');
    }
  };

  const handleDelete = async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await deleteCategory(selectedSubCategory.categoryId!);
    if (response.successOrNot === 'Y') {
      alert('Successfully created');
      navigation(-1);
    } else {
      alert('Error');
    }
  };

  return (
    <>
      <CommonHeader
        title={mode === 'edit' ? '카테고리 수정하기' : '카테고리 추가하기'}
        isShowBackButton={true}
        isShowRightButton={true}
        onClickRightButton={() => handleSave()}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'calc(100vh - 180px)',
          padding: '32px 24px',
        }}
      >
        <Box padding={2}>
          <Box sx={{ display: 'flex', alignItems: ' center' }}>
            <Typography variant="body1">카테고리이름</Typography>
            <Spacer x={24} />
            <TextField
              variant="standard"
              defaultValue={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            />
          </Box>
          <Spacer y={16} />
          <Box sx={{ display: 'flex', alignItems: ' center' }}>
            <Typography variant="body1">색상</Typography>
            <Spacer x={24} />
            <Circle
              color={selectedColor}
              size={40}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
          </Box>
          {showColorPicker && (
            <>
              <Spacer y={12} />
              <SwatchesPicker onChangeComplete={onColorComplete} />
            </>
          )}
        </Box>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={() => {
            handleDelete();
          }}
        >
          삭제하기
        </Button>
      </Box>
    </>
  );
};

export default CreateCategoryPage;
