import CheckIcon from "@material-ui/icons/Check";
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
      <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', fontWeight: 'bold',
      color: 'grey.600' }}>
        <Toolbar>
          {props.isShowBackButton && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigation(-1)}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {props.title}
          </Typography>
          {props.rightButtonIcon && (
            <IconButton
              onClick={() => {
                props.onClickRightIconButton();
              }}
            >
              {props.rightButtonIcon}
              <CheckIcon />
            </IconButton>
          )}
          {props.isShowRightButton && (
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                props.onClickRightButton();
              }}
            >
              완료
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CommonHeader;
