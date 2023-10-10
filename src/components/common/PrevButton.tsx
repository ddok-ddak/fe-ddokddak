import { Box, Button } from '@mui/material';

const PrevButton = ({
  prevBtnText,
  handlePrevBtn,
}: {
  prevBtnText?: string;
  handlePrevBtn?: () => {} | void;
}) => {
  return (
    <Box
      sx={{
        mt: '1vh',
        height: '13px',
        width: '100vw',
        display: 'flex',
      }}
    >
      <Button
        onClick={handlePrevBtn}
        sx={{
          p: 0,
          m: 0,
          lineHeight: '13px',
          color: '#949494',
          fontSize: '13px',
          marginRight: '95%',
        }}
      >
        {prevBtnText}
      </Button>
    </Box>
  );
};

export default PrevButton;
