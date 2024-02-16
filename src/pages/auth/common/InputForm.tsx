import React from 'react';

import {
  Box,
  FormControl,
  Input,
  FormHelperText,
  Typography,
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export type InputItemType = {
  name: string;
  placeholder: string;
  errorHelper?: string;
  validHelper?: string;
  infoHelper?: string;
  duplicateCheckerButton?: ReactJSXElement;
  duplicateCheckerHandler?: () => {};
  verifyCodeRequestButton?: ReactJSXElement;
  verifyCodeRequestHandler?: () => void;
  onChangeHandler?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => Promise<boolean | undefined | void> | boolean | undefined | void;
  type?: string;
  value?: string;
};

const InputForm = ({
  itemArray,
  disableDuplicateChkBtn,
  helper,
  isHelperError,
  value,
}: {
  itemArray: InputItemType[];
  disableDuplicateChkBtn?: boolean;
  helper?: string;
  isHelperError?: boolean;
  value?: string;
}) => {
  const InputItem = (item: InputItemType, idx: number) => {
    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}
      >
        <FormControl variant="standard" fullWidth margin="normal">
          <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
          <Input
            placeholder={item.placeholder}
            endAdornment={item.duplicateCheckerButton}
            onChange={item.onChangeHandler}
            type={item.type}
            value={value}
            autoComplete="off"
          />
          <FormHelperText sx={{ color: 'green' }} error={isHelperError}>
            {helper ? helper : ' '}
          </FormHelperText>
        </FormControl>
        {item.verifyCodeRequestButton}
      </Box>
    );
  };

  return (
    <>
      {Object.values(itemArray).map((item: InputItemType, idx: number) => {
        return <Box key={idx}>{InputItem(item, idx)}</Box>;
      })}
    </>
  );
};

export default InputForm;
