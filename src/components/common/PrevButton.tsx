import { Box, Button } from "@mui/material";

const PrevButton = ({
  showPrevBtn,
  handlePrevBtn,
}: {
  showPrevBtn?: boolean;
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
      {showPrevBtn && (
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
          {'뒤로'}
        </Button>
      )}
    </Box>
  );
};

export default PrevButton;
