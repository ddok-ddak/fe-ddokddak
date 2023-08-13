import { stepButtonProps } from '@/store/common';
import { Button, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

const BottomButton = ({
  btnStyleProps,
  textStyleProps,
}: {
  btnStyleProps: object;
  textStyleProps: object;
}) => {
  const nextButtonProps = useRecoilValue(stepButtonProps);
  const combinedStyleProps = Object.assign(
    {
      m: 0,
      p: 0,
      flex: '1 1 auto',
      bottom: 0,
      borderRadius: '5px',
      boxShadow: 'none',
      color: 'common.white',
      '&:Mui-disabled': {
        backgroundColor: 'primary.dark',
      },
    },
    btnStyleProps,
  );
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      disabled={nextButtonProps.isDisabled}
      onClick={nextButtonProps.clickHandler}
      sx={combinedStyleProps}
    >
      <Typography sx={textStyleProps}>{nextButtonProps.text}</Typography>
    </Button>
  );
};

export default BottomButton;
