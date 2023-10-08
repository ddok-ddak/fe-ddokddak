/* eslint-disable import/order */
import PrevButton from '@/components/common/PrevButton';
import { Box, Button, Container } from '@mui/material';
import { ReactNode } from 'react';

const SettingWrapper = ({
  children,
  showPrevBtn,
  handlePrevBtn,
}: {
  children: ReactNode;
  showPrevBtn?: boolean;
  handlePrevBtn?: () => {} | void;
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
      <PrevButton showPrevBtn={showPrevBtn} handlePrevBtn={handlePrevBtn}/>
      {children}
    </Container>
  );
};

export default SettingWrapper;
