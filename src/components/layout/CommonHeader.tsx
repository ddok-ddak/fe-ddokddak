import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Spacer from '../common/Spacer';

export interface CommonHeaderProps {
  title: string;
  isShowBackButton?: boolean;
  rightButtonIcon?: ReactElement;
  isShowRightButton?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickRightButton?: any;
  onClickRightIconButton?: any;
}

const CommonHeader = (props: CommonHeaderProps) => {
  const navigation = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          {props.isShowBackButton ? (
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigation(-1)}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          ) : (
            <Spacer x={52} />
          )}
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '700',
              lineHeight: '16px',
              color: '#949494',
            }}
          >
            {props.title}
          </Typography>
          {props.rightButtonIcon && (
            <IconButton
              onClick={() => {
                props.onClickRightIconButton();
              }}
            >
              {props.rightButtonIcon}
            </IconButton>
          )}
          {props.isShowRightButton ? (
            <Button
              variant="text"
              onClick={() => {
                props.onClickRightButton();
              }}
            >
              완료
            </Button>
          ) : (
            <Spacer x={52} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CommonHeader;
