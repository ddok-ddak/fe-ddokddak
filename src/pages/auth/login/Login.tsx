import { Avatar, Box, Button, Container, Input } from '@mui/material';
import { Link } from 'react-router-dom';
// import { ReactElement, useEffect, useCallback, useState } from 'react';
// import { Typography } from '@mui/material';
// import React from 'react';
// import type { ChangeEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import * as U from '../../utils';
// import { useAuth } from '../../contexts';
// import { currentUserInfo } from '@/store/info';
// import PortalAuth from '../../containers/portalAuth/portalAuth';

// const [currentUserInfo, setCurrentUserInfo] = useRecoilState(currentUserInfo);

// type LoginFormType = Record<'email' | 'password', string>;
// const initialFormState = { email: '', password: '' };

export default function Login() {
//     const [{ email, password }, setForm] =
//       useState<LoginFormType>(initialFormState);
//     const changed = useCallback(
//       (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
//         setForm((obj) => ({ ...obj, [key]: e.target.value }));
//       },
//       [],
//     );

//       const navigate = useNavigate();
//       const { login } = useAuth();

//       const loginAccount = useCallback(() => {
//         login(email, password, () => navigate('/record'));
//       }, [email, password, navigate, login]);

//     useEffect(() => {
//       U.readObjectP<LoginFormType>('user')
//         .then((user) => {
//           if (user) setForm(user);
//         })
//         .catch((e) => {});
//     }, []);
//     //   const Login = (props) => {
//     //   const [portalClicked, setPortalClicked] = useState(false);
//     //   const [loginClicked, setLoginClicked] = useState(true);
//     //   const handlePortal = () => {
//     //     setPortalClicked(!portalClicked);
//     //   };
//     //   const handleLoginClicked = () => {
//     //     setLoginClicked(!loginClicked);
//     //   };
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingLeft: '32px',
          paddingTop: '32px',
        }}
      >
        <Avatar sx={{ width: 142, height: 142 }}></Avatar>
      </Box>
      <Container
        sx={{
          marginTop: '30px',
          padding: '10px',
        }}
      >
        <h3>이메일</h3>
        <Input
          name="email"
          placeholder="이메일 주소를 입력해주세요"
          fullWidth
            // value={email}
            // onChange={changed('email')}
        />

        <h3>비밀번호</h3>
        <Input
          name="password"
          placeholder="비밀번호를 입력해주세요"
          fullWidth
            // value={password}
            // onChange={changed('password')}
        />
        <Container sx={{ padding: '16px' }}></Container>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
            // onClick={loginAccount}
        >
          로그인
        </Button>

        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '15px',
          }}
        >
          <Button variant="text" component={Link} to="/signUp">
            회원가입
          </Button>
          <Button variant="text" component={Link} to="/findID">
            아이디 찾기
          </Button>
          <Button variant="text" component={Link} to="/resetPW">
            비밀번호 재설정
          </Button>
        </Container>

        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '15px',
          }}
        >
          <Button variant="outlined" color="primary" sx={{ borderRadius: 28 }}>
            K
          </Button>
          <Button variant="outlined" color="primary" sx={{ borderRadius: 28 }}>
            N
          </Button>
          <Button variant="outlined" color="primary" sx={{ borderRadius: 28 }}>
            G
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

// export default Login;
