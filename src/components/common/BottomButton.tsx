import { IButtonState, currentFormType, stepButtonProps } from '@/store/common';
import { Button, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

const BottomButton = ({
  btnStyleProps,
  textStyleProps,
  buttonProps,
}: {
  btnStyleProps: object;
  textStyleProps: object;
  buttonProps?: IButtonState;
}) => {
  const stepType = useRecoilValue(currentFormType);
  const tempButtonProps = useRecoilValue(stepButtonProps);
  const nextButtonProps = buttonProps || tempButtonProps;

  const combinedStyleProps = Object.assign(
    {
      m: 0,
      p: 0,
      flex: '1 1 auto',
      bottom: 0,
      borderRadius: '5px',
      boxShadow: 'none',
      color: 'common.white',
      '&.Mui-disabled': {
        backgroundColor: stepType === 'LOGIN' ? 'pink.300' : 'grey.300',
        color: 'common.white'
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
