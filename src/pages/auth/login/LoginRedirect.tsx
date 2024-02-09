import { setTokenCookie } from '@/api/http';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginRedirect() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const accessToken = new URL(window.location.href).searchParams.get(
      'accessToken',
    ); // 현재 URL에서 토큰만 추출
    setTokenCookie(accessToken);
    navigate('/record', { replace: false });
  }, []);

  return <></>;
}

export default LoginRedirect;