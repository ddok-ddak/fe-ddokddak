import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { SignUpNextButtonState, SignUpStepInstruction } from '@/store/signUp';

import {
  Container,
  Button,
  Box,
  Typography
} from '@mui/material';


const FormWrapper = ({children}: {children: ReactNode}) => {
  const signUpNextButtonProps = useRecoilValue(SignUpNextButtonState);
  const signUpStepInstruction = useRecoilValue(SignUpStepInstruction);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 2 }}>
      <Box sx={{ height: '350px' }}>
        <Typography
          sx={{
            color: '#222222',
            fontWeight: '700',
            fontSize: '18px',
            marginBottom: '41px',
          }}
        >
          {signUpStepInstruction}
        </Typography>
        {children}
      </Box>
      <Button
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        disabled={signUpNextButtonProps.isDisabled}
        onClick={signUpNextButtonProps.clickHandler}
        sx={{
            borderRadius: '5px',
            boxShadow: 'none',
            color: '#ffffff',
            '&:Mui-disabled': {
            backgroundColor: '#DDDDDD',
            },
        }}
      >
        {signUpNextButtonProps.text}
      </Button>
    </Container>
  );
};

export default FormWrapper;