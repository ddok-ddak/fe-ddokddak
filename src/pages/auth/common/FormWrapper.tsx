import BottomButton from '@/components/common/BottomButton';
import Spacer from '@/components/common/Spacer';
import { stepInstruction } from '@/store/common';
import { Box, Container, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

const FormWrapper = ({ children }: { children: ReactNode }) => {
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
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 47vh' }}>
        <Typography
          sx={{
            color: 'grey.700',
            fontWeight: '700',
            fontSize: '18px',
            padding: '30px 0 41px 0',
          }}
        >
          {instruction}
        </Typography>
        <form>{children}</form>
      </Box>
      <BottomButton
        btnStyleProps={{ flex: '0 0 6vh' }}
        textStyleProps={{}}
      />
      <Spacer y={140} />
    </Container>
  );
};

export default FormWrapper;
