import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/record', { replace: true });
  }, []);

  return <></>;
}

export default LoginRedirect;