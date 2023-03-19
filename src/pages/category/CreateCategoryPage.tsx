import { Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import Circle from '../../components/common/Circle';
import Spacer from '../../components/common/Spacer';
import CommonHeader from '../../components/layout/CommonHeader';
import { categories } from '../../store/tempData';
import AddIcon from '@mui/icons-material/Add';
import { ColorResult, SwatchesPicker } from 'react-color';

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
  const [selectedColor, setSelectedColor] = useState('#dddddd');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const onColorComplete = (
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedColor(color.hex);
    setShowColorPicker(false);
  };

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
    </>
  );
};

export default CreateCategoryPage;
