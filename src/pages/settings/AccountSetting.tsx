/* eslint-disable import/order */
import { Box, IconButton, Input, Typography } from '@mui/material';

import UserAvatar from '@/components/settings/UserAvatar';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../auth/common/Wrapper';
import CommonHeader from '@/components/layout/CommonHeader';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserInfo } from '@/store/info';
import { useState, useEffect, useRef } from 'react';
import { updateNickname, UserData } from '@/api/auth';
import { popupShowState, popupSuccessState } from '@/store/popupMessage';
import { currentPopupMessageType, popupMessageText } from '@/store/common';

const AccountSetting = () => {
  const navigation = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState<UserData>(currentUserInfo);
  const [newNickname, setNewNickname] = useState(userInfo.nickname);
  const refValue = useRef(newNickname);

  const setIsPopupShow = useSetRecoilState(popupShowState);
  const setIsSuccessPopup = useSetRecoilState(popupSuccessState);
  const setPopupText = useSetRecoilState(popupMessageText);
  const setPopupMessageType = useSetRecoilState(currentPopupMessageType);

  useEffect(() => {
    refValue.current = newNickname;
  }, [newNickname]);

  return (
    <Wrapper
      headerComp={
        <CommonHeader
          title={'수정하기'}
          isShowPrevButton={true}
          isShowNextButton={true}
          nextButtonIcon={
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              onClick={async () => {
                const newNickname = refValue.current;
                if (newNickname === userInfo.nickname && newNickname !== '') {
                  return;
                }
                const result = await updateNickname(newNickname);
                let popupText = '';
                if (result.status === 'SUCCESS') {
                  setUserInfo({
                    ...userInfo,
                    nickname: newNickname,
                  });
                  navigation('/settings');
                  popupText = '닉네임 변경 성공!';
                } else {
                  popupText = '닉네임 변경 실패!';
                }

                setPopupMessageType('NICKNAME');
                setIsPopupShow(() => true);
                setPopupText(popupText);
              }}
            >
              <Typography
                sx={{
                  fontSize: '13px',
                  color:
                    newNickname !== userInfo.nickname ? 'pink.700' : 'grey.500',
                }}
              >
                {'완료'}
              </Typography>
            </IconButton>
          }
        />
      }
      handlePrevBtn={() => navigation('/settings')}
    >
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'inline-block', position: 'relative', mt: 1 }}>
          <UserAvatar />
          <IconButton
            sx={{ position: 'absolute', right: '-5px', bottom: '-5px' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="black" />
              <path
                d="M9.9999 11.6004C10.8836 11.6004 11.5999 10.884 11.5999 10.0004C11.5999 9.11673 10.8836 8.40039 9.9999 8.40039C9.11625 8.40039 8.3999 9.11673 8.3999 10.0004C8.3999 10.884 9.11625 11.6004 9.9999 11.6004Z"
                fill="white"
              />
              <path
                d="M8.5 5L7.585 6H6C5.45 6 5 6.45 5 7V13C5 13.55 5.45 14 6 14H14C14.55 14 15 13.55 15 13V7C15 6.45 14.55 6 14 6H12.415L11.5 5H8.5ZM10 12.5C8.62 12.5 7.5 11.38 7.5 10C7.5 8.62 8.62 7.5 10 7.5C11.38 7.5 12.5 8.62 12.5 10C12.5 11.38 11.38 12.5 10 12.5Z"
                fill="white"
              />
            </svg>
          </IconButton>
        </Box>
        <Input
          id="standard-textarea"
          defaultValue={newNickname}
          onChange={(event) => {
            const newValue = event.target.value;
            setNewNickname(newValue);
          }}
          multiline
          sx={{
            fontSize: '20px',
            fontWeight: '600',
            textAlign: 'center',
          }}
        />
      </Box>
    </Wrapper>
  );
};

export default AccountSetting;
