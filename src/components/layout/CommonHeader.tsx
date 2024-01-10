import { AppBar, Box, IconButton, Typography } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface CommonHeaderProps {
  title: string;
  isShowPrevButton?: boolean;
  prevButtonIcon?: ReactNode;
  prevButtonText?: string;
  onClickPrevButton?: (event: React.MouseEvent<HTMLElement>) => void;
  isShowNextButton?: boolean;
  nextButtonIcon?: ReactElement;
  nextButtonText?: string;
  onClickNextButton?: (event: React.MouseEvent<HTMLElement>) => void;
}

const CommonHeader = (props: CommonHeaderProps) => {
  const navigation = useNavigate();
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        display: 'flex',
        width: '100%',
        height: '7vh',
        flexDirection: 'row',
        flex: '0 0 10%',
      }}
    >
      <Box sx={{ mr: 2, flex: '0 0 10vw' }}>
        {props.isShowPrevButton && (
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={
              (event) => {
                if (props.onClickPrevButton) {
                  props.onClickPrevButton(event);
                } else {
                  navigation(-1);
                }
              }
            }
          >
            <Typography sx={{ fontSize: '13px', color: 'grey.500' }}>
              {props.prevButtonText ?? '뒤로'}
            </Typography>
          </IconButton>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 80vw',
        }}
      >
        <Typography
          component="div"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1 0 auto',
            textAlign: 'center',
            verticalAlign: 'center',
            fontSize: '16px',
            fontWeight: '700',
            color: 'grey.500',
          }}
        >
          {props.title}
        </Typography>
      </Box>
      <Box sx={{ ml: 2, flex: '0 0 10vw' }}>
        {props.isShowNextButton && (
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={props.onClickNextButton}
          >
            <Typography sx={{ fontSize: '13px', color: 'grey.500' }}>
              {props.nextButtonText ?? '완료'}
            </Typography>
          </IconButton>
        )}
      </Box>
    </AppBar>
  );
};

export default CommonHeader;
