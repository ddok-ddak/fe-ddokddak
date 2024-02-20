import { buttonText } from '@/constants/message';
import { stepButtonProps, stepInstruction } from '@/store/common';
import { theme } from '@/styles';
import {
  Box,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

type ItemType = {
  required: boolean;
  desc: string;
  checked: boolean;
};

const termsAndConditionsArray: ItemType[] = [
  {
    required: false,
    desc: '모두 동의합니다.',
    checked: false,
  },
  {
    required: true,
    desc: '만 14세 이상입니다',
    checked: false,
  },
  {
    required: true,
    desc: '[필수] 이용 약관 동의',
    checked: false,
  },
  {
    required: true,
    desc: '[필수] 개인정보 수집 및 이용 동의',
    checked: false,
  },
  {
    required: false,
    desc: '[선택] 광고, 마케팅 활용 정보수신 동의',
    checked: false,
  },
];

const CheckTermsAndConditions = (props: any) => {
  const setInstruction = useSetRecoilState(stepInstruction);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);

  const [checked, setChecked] = useState([false, false, false, false, false]);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const checkedLength = checked.length;

  const handleCheckboxToggle = (idx: number) => () => {
    const currentIndex = idx;
    let newChecked: boolean[] = [...checked];
    let newValue = !newChecked[idx];
    let isRequiredCheck = false;

    if (currentIndex === 0) {
      // 모두 동의
      newChecked.fill(newValue);
    } else {
      newChecked[idx] = newValue;
      const falseChecked = newChecked.reduce((prev: number[], curr: any, idx: number) => {
        return idx ? (curr ? [...prev] : [...prev, curr]) : [];
      }, []);
      if (!falseChecked.length) {
        newChecked[0] = true;
      } else if (falseChecked.length < checkedLength) {
        newChecked[0] = false;
      }
    }
    setChecked(newChecked);
    isRequiredCheck = !(newChecked[1] && newChecked[2] && newChecked[3]);
    setIsNextButtonDisabled(isRequiredCheck);
    setNextButtonProps({
      ...nextButtonProps,
      isDisabled: isRequiredCheck,
    });
  };

  const CheckboxItem = (item: ItemType, idx: number) => {
    const labelId = `checkbox-list-label-${idx}`;
    return (
      <ListItem disablePadding>
        <ListItemButton
          role={undefined}
          onClick={handleCheckboxToggle(idx)}
          dense
        >
          <ListItemIcon>
            <Checkbox
              required={item.required}
              edge="start"
              sx={{ width: '21px', height: '21px' }}
              checked={checked[idx]}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={item.desc} />
        </ListItemButton>
      </ListItem>
    );
  };

  useEffect(() => {
    setInstruction('서비스를 이용하기 위해 약관에 동의 해주세요.');
    setNextButtonProps({
      ...nextButtonProps,
      text: buttonText.next,
      isDisabled: true,
      clickHandler: props.handleNextButton,
    });
  }, []);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      {Object.values(termsAndConditionsArray).map(
        (item: ItemType, idx: number) => {
          return (
            <Box key={idx}>
              {idx === 1 && (
                <Divider
                  variant="middle"
                  sx={{
                    backgroundColor: theme.palette.grey![300],
                    height: '3px',
                    border: 'none',
                    margin: '10px 0 10px 5px',
                    width: '95%',
                  }}
                />
              )}
              {CheckboxItem(item, idx)}
            </Box>
          );
        },
      )}
    </List>
  );
};

export default CheckTermsAndConditions;
