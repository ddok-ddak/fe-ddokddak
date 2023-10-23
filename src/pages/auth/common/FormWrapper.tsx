import BottomButton from '@/components/common/BottomButton';
import { stepInstruction } from '@/store/common';
import { Box, Container, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

const FormWrapper = ({children}: {children: ReactNode}) => {
  const instruction = useRecoilValue(stepInstruction);
  
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
      {BottomButton()}
    </Container>
  );
};

export default FormWrapper;
