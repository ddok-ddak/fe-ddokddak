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
import { useEffect, useState } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ListIcon from '@/components/settings/ListIcon';
import UserAvatar from '@/components/settings/UserAvatar';
import { bottomNavigation, stepIndex } from '@/store/common';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { deleteUser, signOut } from '@/api/auth';
import CommonResponse, { removeTokenCookie } from '@/api/http';
import { modalState } from '@/store/modal';
import { CategoryViewType, categoryViewMode } from '@/store/category';
import { modalAnswer } from '@/constants/message';
import { useModalCommon } from '@/hooks/modalCommon';
import Wrapper from '../auth/common/Wrapper';
import { currentUserInfo } from '@/store/info';
import { UserModeList } from '../category/CategoryPage';

const SettingPage = () => {
  const navigation = useNavigate();
  const setNavPage = useSetRecoilState(bottomNavigation);

  const setStepIndex = useSetRecoilState(stepIndex);
  const { showServerError, closeModal } = useModalCommon();
  const userInfo = useRecoilValue(currentUserInfo);
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const setCategoryMode = useSetRecoilState<CategoryViewType>(categoryViewMode);
  const resetUserInfo = useResetRecoilState(currentUserInfo);

  const [userNickname, setUserNickname] = useState('TEST ACCOUNT 님');

  useEffect(() => {
    const type =
        UserModeList.filter((mode) => mode.type === userInfo.templateType)[0]
          ?.name || 'TEST ACCOUNT';
    setUserNickname(`#${type} ${userInfo.nickname}님`);
  }, [userInfo]);


  
    /**
   * get user mode & nickname
   * @returns
   */
    // const getUserNickname = () => {
    //   const type =
    //     UserModeList.filter((mode) => mode.type === userInfo.templateType)[0]
    //       ?.name || 'TEST ACCOUNT';
    //   return `#${type} ${userInfo.nickname}님`;
    // };
  /**
   * get list sub header
   * @param text test
   * @returns list sub header
   */
  const getListSubHeader = (text: string) => {
    return (
      <ListSubheader
        sx={{ fontSize: '14px', fontWeight: '600', color: 'common.black' }}
      >
        {text}
      </ListSubheader>
    );
  };

  /**
   * get list item
   * @param param
   * @returns list item
   */
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

  /**
   * handle logout button click event
   */
  const logoutClickHandler = async (event: any, reason: any) => {
    closeModal(event, reason);
    await signOut()
      .then((response: CommonResponse) => {
        if (response.status === 'SUCCESS') {
          closeModal(event, reason);
          removeTokenCookie();
          resetUserInfo();
        } else {
          closeModal(event, reason);
        }
      })
      .catch(() => {
        showServerError();
      });
  };

  /**
   * handle delete account click event
   */
  const deleteAccountClickHandler = async (event: any, reason: any) => {
    closeModal(event, reason);
    const authProviderType = userInfo.authProviderType || 'DEFAULT';
    await deleteUser(authProviderType)
      .then((response: CommonResponse) => {
        if (response.status === 'SUCCESS') {
          closeModal(event, reason);
          removeTokenCookie();
          resetUserInfo();
          navigation('/login');
        }
      })
      .catch(() => {
        showServerError();
      });
  };



  useEffect(() => {
    setNavPage(2);
    setStepIndex(0);
  });

  return (
    <Wrapper
      headerComp={
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={() => navigation('/settings/account')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '15vh',
              margin: '30px 0 0 0',
              borderRadius: '10px',
              color: 'common.black',
              backgroundColor: '#FFF8F8',
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
                {userNickname}
              </Typography>
              <Typography
                align="left"
                sx={{ fontSize: '14px', fontWeight: '400' }}
              >
                {userInfo.email}
              </Typography>
            </Box>
            <>
              <ChevronRightIcon
                sx={{ margin: '0 10px', color: 'common.black' }}
              />
            </>
          </Button>
        </Container>
      }
    >
      <List
        sx={{
          flex: 1,
          height: '70vh',
        }}
      >
        {getListSubHeader('커스텀화')}
        {getListItem({
          text: '모드 및 카테고리 설정',
          handler: () => {
            setCategoryMode('MODEVISIBLE');
            navigation('/category');
          },
        })}

        {getListSubHeader('고객 센터')}
        {getListItem({
          text: 'FAQ',
          handler: () => navigation('/settings/faq'),
        })}

        {getListSubHeader('계정')}
        {getListItem({
          text: '비밀번호 변경',
          handler: () => navigation('/resetPW'),
        })}
        {getListItem({
          text: '로그아웃',
          handler: async () => {
            setModalInfo({
              ...modalInfo,
              open: true,
              title: '로그아웃',
              msg: '로그아웃 하시겠습니까?',
              optionList: null,
              btn1Text: modalAnswer.no,
              btn1ClickHandler: closeModal,
              btn2Text: modalAnswer.yes,
              btn2ClickHandler: logoutClickHandler,
            });
            return true;
          },
        })}
      </List>
      <Button
        sx={{ height: '15vh' }}
        onClick={async () => {
          setModalInfo({
            ...modalInfo,
            open: true,
            title: '탈퇴시 계정은 복구되지 않습니다.',
            msg: '정말 탈퇴 하시겠습니까?',
            btn1Text: modalAnswer.no,
            btn1ClickHandler: closeModal,
            btn2Text: modalAnswer.yes,
            btn2ClickHandler: deleteAccountClickHandler,
          });
          return true;
        }}
      >
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
    </Wrapper>
  );
};

export default SettingPage;
