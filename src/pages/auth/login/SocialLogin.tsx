import GoogleIcon from '@/icons/social/GoogleIcon';
import KakaoIcon from '@/icons/social/KakaoIcon';
import NaverIcon from '@/icons/social/NaverIcon';
import { Button } from '@mui/material';

export type SocialType = 'kakao' | 'naver' | 'google';

function SocialLogin({registrationId}: {registrationId: SocialType}) {
  return (
    <Button
      onClick={() => {
        window.open(
          `https://dodonenow.com/api/oauth2/authorization/${registrationId}`,
          '_parent',
          // 'location=yes, height=570, width=520, scrollbars=yes, status=yes',
        );
      }}
    >
      {registrationId === 'kakao' && <KakaoIcon />}
      {registrationId === 'naver' && <NaverIcon />}
      {registrationId === 'google' && <GoogleIcon />}
    </Button>
  );
}

export default SocialLogin;
