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
import React, { useEffect } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ListIcon from '@/components/settings/ListIcon';
import UserAvatar from '@/components/settings/UserAvatar';
import { stepIndex } from '@/store/common';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import SettingWrapper from '../auth/common/Wrapper';
import { useCookies } from 'react-cookie';
import { signOut } from '@/api/auth';

const SettingPage = () => {
  const navigation = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);

  const setStepIndex = useSetRecoilState(stepIndex);

  const getListSubHeader = (text: string) => {
    return (
      <ListSubheader
        sx={{ fontSize: '14px', fontWeight: '600', color: 'common.black' }}
      >
        {text}
      </ListSubheader>
    );
  };

  const getListItem = ({
    text,
    handler,
  }: {
    text: string;
    handler?: () => {} | void;
  }) => {
    return (
      <ListItemButton onClick={handler} sx={{ m: 0, pb: 0, pt: 0 }}>
        <ListIcon />
        <ListItemText sx={{ ml: 1 }} primary={text} />
      </ListItemButton>
    );
  };

  useEffect(() => {
    setStepIndex(0);
  });

  return (
    <Container
      sx={{
        m: 0,
        p: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'justify-content',
        alignItems: 'center',
      }}
    >
      <SettingWrapper>
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
            <Typography
              align="left"
              sx={{ fontSize: '16px', fontWeight: '600' }}
            >
              {'#직장인 수달님'}
            </Typography>
            <Typography
              align="left"
              sx={{ fontSize: '14px', fontWeight: '400' }}
            >
              {'dodone@gmail.com'}
            </Typography>
          </Box>
          <>
            <ChevronRightIcon
              sx={{ margin: '0 10px', color: 'common.black' }}
            />
          </>
        </Button>
        <List
          sx={{
            flex: 1,
          }}
        >
          {getListSubHeader('커스텀화')}
          {getListItem({
            text: '모드 및 카테고리 설정',
            handler: () => navigation('/category'),
          })}

          {getListSubHeader('고객 센터')}
          {getListItem({ text: '도움말' })}
          {getListItem({ text: '문의하기' })}

          {getListSubHeader('계정')}
          {getListItem({
            text: '비밀번호 변경',
            handler: () => navigation('/resetPW'),
          })}
          {getListItem({
            text: '로그아웃',
            handler: async () => {
              await signOut()
                .then((response: any) => {
                  // if (response.status === 'SUCCESS') {
                  removeCookie('accessToken');
                  removeCookie('refreshToken');
                  navigation('/');
                  // }
                })
                .catch((error) => {
                  // TODO: show modal message
                });
            },
          })}
        </List>
        <Button>
          <Typography
            sx={{
              fontSize: '12px',
              color: 'grey.500',
              textDecoration: 'underline',
            }}
          >
            {'회원 탈퇴'}
          </Typography>
        </Button>
      </SettingWrapper>
    </Container>
  );
};

export default SettingPage;
