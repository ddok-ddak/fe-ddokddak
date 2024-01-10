import Google from '@/components/auth/Google';
import Kakao from '@/components/auth/Kakao';
import Logo from '@/components/auth/Logo';
import Naver from '@/components/auth/Naver';
import { stepButtonProps, stepInstruction, currentFormType } from '@/store/common';
import { signInUpStepInstruction } from '@/store/signUp';
import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import FormWrapper from '../common/FormWrapper';
import InputForm, { InputItemType } from '../common/InputForm';
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

// type 88FormType = Record<'email' | 'password', string>;
// const initialFormState = { email: '', password: '' };



export default function Login() {
  
  // const setSignUpStepInstruction = useSetRecoilState(signInUpStepInstruction);
  
  // console.log('mySelector', useRecoilValue(mySelector))

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
  const setStepType = useSetRecoilState(currentFormType);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(
    stepButtonProps,
  );

  const setInstruction = useSetRecoilState(stepInstruction)

  const itemArray1: InputItemType[] = [
    {
      name: '이메일',
      placeholder: '이메일 주소를 입력해주세요.',
      // type: 'id',
      onChangeHandler: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      ) => {
        const value = event.target.value;
        // setPassword(value);

        const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
        // if (reg.test(value)) {
        //   setHelper1('사용 가능한 비밀번호입니다.');
        //   setIsHelperError1(() => false);
        //   checkPasswordMatch(value, confirmPassword);
        // } else {
        //   setHelper1('영어, 숫자, 특수문자를 모두 포함한 8 ~ 15자리 이내로 입력해주세요.');
        //   setIsHelperError1(() => true);
        // }
      },
    },
  ];

  const itemArray2: InputItemType[] = [
    {
      name: '비밀번호',
      placeholder: '비밀번호를 입력해주세요.',
      type: 'password',
      onChangeHandler: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      ) => {
        const value = event.target.value;
        // setConfirmPassword(value);
        // checkPasswordMatch(value, password);
      },
    },
  ];


  useEffect(() => {
    setStepType('LOGIN');
    setInstruction('');
    setNextButtonProps({
      text: '로그인',
      clickHandler: nextButtonProps.clickHandler,
      isDisabled: nextButtonProps.isDisabled,
    });

  }, []);


  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pb: 0,
        }}
      >
        <FormWrapper
          children={
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: '30px 0 73px 0',
                }}
              >
                <Logo />
              </Box>
              <InputForm
                key="id"
                itemArray={itemArray1}
                // isHelperError={'isHelperError1'}
                // value={'password'}
              />
              <InputForm key="password" itemArray={itemArray2} />
            </>
          }
        />
      </Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px 8px',
            fontSize: '12px',
          }}
        >
          <Button
            sx={{ color: 'text.primary' }}
            variant="text"
            component={Link}
            to="/signUp"
          >
            회원가입
          </Button>
          <Box
            sx={{
              width: '1px',
              height: '13px',
              backgroundColor: 'text.secondary',
            }}
          ></Box>
          <Button
            sx={{ color: 'text.primary' }}
            variant="text"
            component={Link}
            to="/findID"
          >
            아이디 찾기
          </Button>
          <Box
            sx={{
              width: '1px',
              height: '13px',
              backgroundColor: 'text.secondary',
            }}
          ></Box>
          <Button
            sx={{ color: 'text.primary' }}
            variant="text"
            component={Link}
            to="/resetPW"
          >
            비밀번호 재설정
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px 8px',
            color: 'text.primary',
            fontSize: '12px',
          }}
        >
          <Button>
            <Kakao />
          </Button>
          <Button>
            <Naver />
          </Button>
          <Button>
            <Google />
          </Button>
        </Box>
        <Button>
          <Typography
            align="center"
            sx={{
              fontSize: '11px',
              color: 'common.black',
              textDecoration: 'underline',
            }}
          >
            {'둘러보기 >'}
          </Typography>
        </Button>
        <Typography
          align="center"
          sx={{
            fontSize: '12px',
          }}
        >
          Copyright 2023 ddok-ddak All Right Reserved.
        </Typography>
      </Container>
    </>
  );
}

