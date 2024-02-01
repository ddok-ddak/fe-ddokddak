import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function LoginRedirect() {
  const accessToken = new URL(window.location.href).searchParams.get(
    'accessToken',
  ); // 현재 URL에서 토큰만 추출
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    async function socialLoginSetCookie() {
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', accessToken);
    }
    socialLoginSetCookie();
    navigate('/record', { replace: true });
  }, []);
  return;
}

export default LoginRedirect;
