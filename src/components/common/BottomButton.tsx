import { stepButtonProps } from '@/store/common';
import { Button } from '@mui/material';
import { useRecoilValue } from 'recoil';

const BottomButton = () => {
  const nextButtonProps = useRecoilValue(stepButtonProps);
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      disabled={nextButtonProps.isDisabled}
      onClick={nextButtonProps.clickHandler}
      sx={{
        flexGrow: 0,

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
  );
};

export default BottomButton;
