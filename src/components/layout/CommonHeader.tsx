import CheckIcon from "@material-ui/icons/Check";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
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
  // onClickRightButton?: (event: React.MouseEvent<HTMLElement>) => {};
  onClickRightButton?: (event: React.MouseEvent<HTMLElement>) => void;
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
