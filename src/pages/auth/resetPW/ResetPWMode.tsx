import { resetPWMode, resetPWNextButtonState } from '@/store/resetPW';
import { Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const ResetPWMode = (props: any) => {
  const [nextButtonProps, setNextButtonProps] = useRecoilState(resetPWNextButtonState);
  const [pWChgMode, setPWChgMode] = useRecoilState(resetPWMode);

  const getSelectModeButton = (
    text: string,
    isCurrentPWMode: string,
    handleClick: () => void,
  ) => {
    const buttonColor =
      isCurrentPWMode === pWChgMode ? 'primary.main' : '#949494';
    return (
      <Button
        onClick={handleClick}
        sx={{
          border: '1px solid',
          borderColor: buttonColor,
          color: buttonColor,
          borderRadius: '10px',
          flex: 1,
          m: 1,
          flexBasis: '45%',
          height: '18vh',
        }}
      >
        <Typography
          sx={{
            fontSize: '15px',
            lineHeight: '20px',
            letterSpacing: '-2.5%',
            fontWeight: '600',
          }}
        >
          {text}
        </Typography>
      </Button>
    );
  };

  useEffect(() => {
    setNextButtonProps({
      ...nextButtonProps,
      isDisabled: false,
      clickHandler: props.handleNextButton,
    });
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      {getSelectModeButton('현재 비밀번호로 변경', 'CURRENT', () => {
        setPWChgMode('CURRENT');
      })}
      {getSelectModeButton('비밀번호 재설정', 'RESET', () => {
        setPWChgMode('RESET');
      })}
    </Container>
  );
};

export default ResetPWMode;
