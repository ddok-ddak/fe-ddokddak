import { stepButtonProps, stepInstruction } from '@/store/common';
import { Box, Button, Container, Typography } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const FormWrapper = ({children}: {children: ReactNode}) => {
  
  const instruction = useRecoilValue(stepInstruction);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(
    stepButtonProps,
  );


  // const nextButtonState = customHook.nextButtonState;
  // const instruction = customHook.instruction;

  useEffect(() => {

  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 47vh', }}>
        <Typography
          sx={{
            color: '#222222',
            fontWeight: '700',
            fontSize: '18px',
            margin: '30px 0 41px 0',
          }}
        >
          {instruction}
        </Typography>
        <form>
        {children}
        </form>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={nextButtonProps.isDisabled}
        onClick={nextButtonProps.clickHandler}
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
        {nextButtonProps.text}
      </Button>
    </Container>
  );
};

export default FormWrapper;
