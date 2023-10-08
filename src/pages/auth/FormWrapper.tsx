import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { SignInUpNextButtonState, SignUpStepInstruction } from '@/store/signUp';

import { Container, Button, Box, Typography } from '@mui/material';

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const signUpNextButtonProps = useRecoilValue(SignInUpNextButtonState);
  const signUpStepInstruction = useRecoilValue(SignUpStepInstruction);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography
          sx={{
            color: '#222222',
            fontWeight: '700',
            fontSize: '18px',
            margin: '30px 0 41px 0',
          }}
        >
          {signUpStepInstruction}
        </Typography>
        {children}
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={signUpNextButtonProps.isDisabled}
        onClick={signUpNextButtonProps.clickHandler}
        sx={{
          bottom: 0,
          borderRadius: '5px',
          boxShadow: 'none',
          color: 'common.white',
          '&:Mui-disabled': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        {signUpNextButtonProps.text}
      </Button>
    </Container>
  );
};

export default FormWrapper;
