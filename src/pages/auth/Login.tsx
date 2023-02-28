import { Button, Container, Input } from '@mui/material';

export default function Login() {
  return (
    <Container>
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
          //   value={email}
          //   onChange={changed('email')}
        />

        <h3>비밀번호</h3>
        <Input
          name="password"
          placeholder="비밀번호를 입력해주세요"
          fullWidth
          //   value={password}
          //   onChange={changed('password')}
        />
        <Container sx={{ padding: '16px' }}></Container>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          //   onClick={loginAccount}
        >
          로그인
        </Button>

        <Button variant="text" component={Link} to="/record/create/category">
          회원가입
        </Button>
        <Button variant="text" component={Link} to="/record/create/category">
          아이디 찾기
        </Button>
        <Button variant="text" component={Link} to="/record/create/category">
          비밀번호 재설정
        </Button>
      </Container>
    </Container>
  );
}

// export default Login;
