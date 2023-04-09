/* eslint-disable import/order */
import React from 'react';
import {
  Avatar,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TuneIcon from '@mui/icons-material/Tune';

const SettingPage = () => {
  const [open1, setOpen1] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '32px',
          paddingTop: '32px',
        }}
      >
        <Avatar sx={{ width: 72, height: 72, marginRight: '20px' }}>H</Avatar>
        <Typography variant="h5">{'00 회원님'}</Typography>
        <ChevronRightIcon sx={{ ml: '40px' }} />
      </Box>
      <List sx={{ padding: '32px', width: '100% - 64px' }}>
        <ListItemButton onClick={handleClick1}>
          <ListItemIcon>
            {/* <InboxIcon /> */}
            <AutoAwesomeMosaicIcon />
          </ListItemIcon>
          <ListItemText primary="커스텀화" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ColorLensOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="테마 설정" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <TuneIcon />
              </ListItemIcon>
              <ListItemText primary="시작 요일 설정" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick2}>
          <ListItemIcon>
            {/* <InboxIcon /> */}
            <AutoAwesomeMosaicIcon />
          </ListItemIcon>
          <ListItemText primary="고객센터" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="도움말" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <SupportAgentIcon />
              </ListItemIcon>
              <ListItemText primary="문의하기" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="로그아웃" />
        </ListItemButton>
      </List>
    </>
  );
};

export default SettingPage;
