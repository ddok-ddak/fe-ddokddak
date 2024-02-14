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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import SettingWrapper from '../auth/common/Wrapper';
import { deleteUser, signOut } from '@/api/auth';
import CommonResponse, { removeTokenCookie } from '@/api/http';
import { modalState } from '@/store/modal';
import { CategoryViewType, categoryViewMode } from '@/store/category';
import { useModalCommon } from '@/hooks/modalCommon';
import { modalAnswer } from '@/constants/message';
import { currentUserInfo } from '@/store/info';
import { UserModeListForModal } from '../category/CategoryPage';

const SettingPage = () => {
  const navigation = useNavigate();
  const setNavPage = useSetRecoilState(bottomNavigation);

  const setStepIndex = useSetRecoilState(stepIndex);
  const { showServerError, closeModal } = useModalCommon();
  
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const setCategoryMode = useSetRecoilState<CategoryViewType>(categoryViewMode);
  const userInfo = useRecoilValue(currentUserInfo);
  const [userNickname, setUserNickname] = useState('');

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
    await signOut()
      .then((response: CommonResponse) => {
        if (response.status === 'SUCCESS') {
          closeModal(event, reason);
          removeTokenCookie();
          navigation('/');
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
    await deleteUser()
      .then((response: CommonResponse) => {
        if (response.status === 'SUCCESS') {
          closeModal(event, reason);
          removeTokenCookie();
          navigation('/');
        }
      })
      .catch(() => {
        showServerError();
      });
  };

  useEffect(() => {
    setNavPage(2);
    setStepIndex(0);
    setUserNickname(() => {
      const templateType = UserModeListForModal.filter(
        (mode) => mode.type === userInfo.templateType,
      )[0].name;
      return `# ${templateType} ${userInfo.nickname} 님`;
    });
  }, []);

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
      </SettingWrapper>
    </Container>
  );
};

export default SettingPage;
