/* eslint-disable import/order */
import {
  Box,
  Button,
  Container,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import React from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ListIcon from '@/components/settings/ListIcon';
import UserAvatar from '@/components/settings/UserAvatar';
import { useNavigate } from 'react-router-dom';
import SettingWrapper from './SettingWrapper';

const SettingPage = () => {
  const navigation = useNavigate();

  const [open1, setOpen1] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const getListSubHeader = (text: string) => {
    return (
      <ListSubheader
        sx={{ fontSize: '14px', fontWeight: '600', color: 'common.black' }}
      >
        {text}
      </ListSubheader>
    );
  };

  const getListItem = (text: string, handler?: () => {} | void) => {
    return (
      <ListItemButton onClick={handler} sx={{m: 0, pb: 0, pt: 0}}>
        <ListIcon />
        <ListItemText sx={{ ml: 1 }} primary={text} />
      </ListItemButton>
    );
  };

  return (
    <SettingWrapper showPrevBtn={false}>
      <Button
        onClick={() => navigation('/settings/account')}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '15vh',
          borderRadius: '10px',
          color: 'common.black',
          backgroundColor: '#FFF8F8',
          padding: '0',
        }}
      >
        <Box sx={{ margin: '0 10px', width: 72, height: 72 }}>
          <UserAvatar />
        </Box>
        <Box sx={{ flex: 1, margin: '0 10px' }}>
          <Typography align='left' sx={{ fontSize: '16px', fontWeight: '600' }}>
            {'#직장인 수달님'}
          </Typography>
          <Typography align='left' sx={{ fontSize: '14px', fontWeight: '400' }}>
            {'dodone@gmail.com'}
          </Typography>
        </Box>
        <Button>
          <ChevronRightIcon sx={{ margin: '0 10px', color: 'common.black' }} />
        </Button>
      </Button>
      <List
        sx={{
          flex: 1,
        }}
      >
        {getListSubHeader('커스텀화')}
        {getListItem('모드 및 카테고리 설정')}

        {getListSubHeader('고객 센터')}
        {getListItem('도움말')}
        {getListItem('문의하기', () => navigation('/category'))}

        {getListSubHeader('계정')}
        {getListItem('비밀번호 변경')}
        {getListItem('로그아웃', () => navigation('/category'))}
      </List>
      <Button>
        <Typography
          sx={{
            fontSize: '12px',
            color: '#949494',
            textDecoration: 'underline',
          }}
        >
          {'회원 탈퇴'}
        </Typography>
      </Button>
    </SettingWrapper>
  );
};

export default SettingPage;
