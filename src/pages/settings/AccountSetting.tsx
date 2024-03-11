/* eslint-disable import/order */
import { Box, IconButton, Input } from '@mui/material';

import UserAvatar from '@/components/settings/UserAvatar';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../auth/common/Wrapper';
import CommonHeader from '@/components/layout/CommonHeader';

const AccountSetting = () => {
  const navigation = useNavigate();

  return (
    <Wrapper
      headerComp={
        <CommonHeader title={'수정하기'} isShowPrevButton={true} />
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
          defaultValue="수달"
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
