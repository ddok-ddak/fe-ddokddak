/* eslint-disable import/order */
import {
  Box,
  Button,
  Container,
  Fade,
  Icon,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Spacer from '@/components/common/Spacer';
import ListIcon from '@/components/settings/ListIcon';
import UserAvatar from '@/components/settings/UserAvatar';
import { stepIndex } from '@/store/common';
import { resetPWCompletePopupShow } from '@/store/resetPW';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import SettingWrapper from '../auth/common/Wrapper';

const SettingPage = () => {
  const navigation = useNavigate();

  const [completePopupShow, setCompletePopupShow] = useRecoilState(
    resetPWCompletePopupShow,
  );

  const setStepIndex = useSetRecoilState(stepIndex);

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

  const getListItem = ({text, handler}: {text: string, handler?: () => {} | void}) => {
    return (
      <ListItemButton onClick={handler} sx={{ m: 0, pb: 0, pt: 0 }}>
        <ListIcon />
        <ListItemText sx={{ ml: 1 }} primary={text} />
      </ListItemButton>
    );
  };

  const completePopupComponent = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          height: '8vh',
          borderRadius: '15px',
          backgroundColor: '#D1F1E4',
        }}
      >
        <Fade onClick={() => setCompletePopupShow(false)}>
          <>
            <Icon>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="9" r="9" fill="#16B978" />
                <g clipPath="url(#clip0_1168_926)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.6016 5.67781C13.7372 5.81343 13.8134 5.99735 13.8134 6.18912C13.8134 6.38089 13.7372 6.56481 13.6016 6.70043L8.18091 12.1212C8.10927 12.1928 8.02422 12.2497 7.93062 12.2884C7.83701 12.3272 7.73669 12.3472 7.63536 12.3472C7.53404 12.3472 7.43372 12.3272 7.34011 12.2884C7.24651 12.2497 7.16146 12.1928 7.08982 12.1212L4.39657 9.4284C4.3275 9.36168 4.2724 9.28188 4.2345 9.19365C4.19659 9.10541 4.17664 9.01051 4.17581 8.91448C4.17497 8.81845 4.19327 8.72322 4.22964 8.63434C4.266 8.54546 4.3197 8.46471 4.38761 8.39681C4.45551 8.3289 4.53626 8.2752 4.62514 8.23884C4.71402 8.20248 4.80925 8.18418 4.90528 8.18501C5.00131 8.18585 5.09621 8.2058 5.18444 8.2437C5.27268 8.2816 5.35248 8.3367 5.41919 8.40577L7.63512 10.6217L12.5785 5.67781C12.6457 5.6106 12.7254 5.55729 12.8132 5.52092C12.901 5.48454 12.9951 5.46582 13.0901 5.46582C13.1851 5.46582 13.2792 5.48454 13.367 5.52092C13.4547 5.55729 13.5345 5.6106 13.6016 5.67781Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1168_926">
                    <rect
                      width="11.5714"
                      height="11.5714"
                      fill="white"
                      transform="translate(3.21387 3.21387)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Icon>
            <Spacer x={5} />
            <Typography
              sx={{
                pt: '3px',
                color: 'grey.700',
                lineHeight: '24px',
                fontSize: '13px',
              }}
            >
              {'비밀번호가 변경되었습니다.'}
            </Typography>
          </>
        </Fade>
      </Box>
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
          {getListItem({text: '모드 및 카테고리 설정', handler: () => navigation('/category')})}

          {getListSubHeader('고객 센터')}
          {getListItem({text: '도움말'})}
          {getListItem({text: '문의하기'})}

          {getListSubHeader('계정')}
          {getListItem({text: '비밀번호 변경', handler:  () => navigation('/resetPW')})}
          {getListItem({text: '로그아웃', handler:  () => navigation('/login')})}
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
      {completePopupShow && completePopupComponent()}
    </Container>
  );
};

export default SettingPage;
