import CheckIcon from "@material-ui/icons/Check";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Spacer from '../common/Spacer';

export interface CommonHeaderProps {
  title: string;
  isShowBackButton?: boolean;
  rightButtonIcon?: ReactElement;
  isShowRightButton?: boolean;
  // onClickRightButton?: (event: React.MouseEvent<HTMLElement>) => {};
  onClickRightButton?: (event: React.MouseEvent<HTMLElement>) => void;
}

const CommonHeader = (props: CommonHeaderProps) => {
  const navigation = useNavigate();

  return (
    // <Box sx={{ flexGrow: 1 }}>
    <Box>
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
            <Spacer />
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
          {props.isShowRightButton && (
            <IconButton onClick={props.onClickRightButton}>
              {props.rightButtonIcon}
              <CheckIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CommonHeader;