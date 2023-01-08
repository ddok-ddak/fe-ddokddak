import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import '../styles/setting.css';
import '../styles/index';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const SettingPage2 = () => {
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
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '32px' }}>
        <Avatar sx={{ width: 72, height: 72, marginRight: '16px'}}>H</Avatar>
        <Typography variant="h5">{'00 회원님'}</Typography>
      </Box>
      <List sx={{padding: '32px', width: '100% - 64px'}}>
        <ListItemButton onClick={handleClick1}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="커스텀화" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Your Name" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="시작 요일 설정" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick2}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="고객센터" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="도움말" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="문의하기" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary="로그아웃" />
        </ListItemButton>
      </List>
    </>
  );
};

export default SettingPage2;
