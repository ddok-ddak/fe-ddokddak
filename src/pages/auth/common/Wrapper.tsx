/* eslint-disable import/order */
import PrevButton from '@/components/common/PrevButton';
import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

const Wrapper = ({
  prevBtnText,
  handlePrevBtn,
  headerComp,
  children,
}: {
  prevBtnText?: string;
  handlePrevBtn?: () => {} | void;
  headerComp?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 16px 23px 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          // display: 'flex',
          // flexDirection: 'row',
          // flex: '1 0 100%',
        }}
      >
        {/* <PrevButton prevBtnText={prevBtnText} handlePrevBtn={handlePrevBtn} /> */}
        {headerComp}
      </Box>
      {children}
    </Container>
  );
};

export default Wrapper;
