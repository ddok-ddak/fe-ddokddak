import Logo from '@/components/auth/Logo';
import {
  stepButtonProps,
  stepInstruction,
  currentFormType,
} from '@/store/common';
import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import FormWrapper from '../common/FormWrapper';
import InputForm, { InputItemType } from '../common/InputForm';

import SocialLogin from './SocialLogin';
import { checkPattern } from '@/hooks/checkPattern';
import { signIn } from '@/api/auth';
import Spacer from '@/components/common/Spacer';

const { checkEmailValidity } = checkPattern();

export default function Login() {
  const navigate = useNavigate();

  const setStepType = useSetRecoilState(currentFormType);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);
  const setInstruction = useSetRecoilState(stepInstruction);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helper1, setHelper1] = useState('');
  const [helper2, setHelper2] = useState('');
  const [isHelperError1, setIsHelperError1] = useState(false);

  const itemArray1: InputItemType[] = [
    {
      name: '이메일',
      placeholder: '이메일 주소를 입력해주세요.',
      type: 'id',
      onChangeHandler: (event) => setEmail(() => event.target.value),
    },
  ];

  const itemArray2: InputItemType[] = [
    {
      name: '비밀번호',
      placeholder: '비밀번호를 입력해주세요.',
      type: 'password',
      onChangeHandler: (event) => setPassword(() => event.target.value),
    },
  ];

  /**
   * handle login button click event
   */
  const loginButtonClickHandler = async () =>
    await signIn({ email, password })
      .then((response) => {
        if (response.status !== 'SUCCESS') {
          setHelper2('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch(() => {
        setHelper2('오류가 발생했습니다. 다시 시도 해주세요.');
      });

  useEffect(() => {
    if (email === '') {
      setHelper1('');
    } else {
      if (checkEmailValidity(email)) {
        setHelper1('');
        setIsHelperError1(() => false);
      } else {
        setHelper1('올바른 이메일 형태가 아닙니다.');
        setIsHelperError1(() => true);
      }
    }
  }, [email]);

  useEffect(() => {
    setHelper2('');
  }, [password]);

  useEffect(() => {
    setHelper2('');
    setNextButtonProps({
      ...nextButtonProps,
      // isDisabled: !(!isHelperError1 && email !== '' && password !== ''),
      isDisabled: false,
      clickHandler: loginButtonClickHandler,
    });
  }, [email, password]);

  useEffect(() => {
    setStepType('LOGIN');
    setInstruction('');
    setNextButtonProps({
      ...nextButtonProps,
      text: '로그인',
    });
  }, []);

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 0,
          m: 0,
          width: '100%',
          height: '497px',
          flex: '1 1 497px',
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
                  height: '194px',
                  p: '0px',
                  m: '0px',
                }}
              >
                <Logo />
              </Box>
              <InputForm
                key="id"
                itemArray={itemArray1}
                helper={helper1}
                isHelperError={true}
              />
              <InputForm
                key="password"
                itemArray={itemArray2}
                helper={helper2}
                isHelperError={true}
              />
            </>
          }
        />
      </Container>
      <Container
        sx={{
          display: 'flex',
          flex: '1 0 auto',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '315px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 8px 0px 8px',
            fontSize: '12px',
          }}
        >
          <Button
            sx={{ color: 'text.primary' }}
            variant="text"
            component={Link}
            to="/signUp"
          >
            {'회원가입'}
          </Button>
          <Box
            sx={{
              width: '1px',
              height: '13px',
              backgroundColor: 'text.secondary',
            }}
          />
          <Box
            sx={{
              width: '1px',
              height: '13px',
              backgroundColor: 'text.secondary',
            }}
          />
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
          <SocialLogin registrationId={'kakao'} />
          <SocialLogin registrationId={'naver'} />
          <SocialLogin registrationId={'google'} />
        </Box>

        <Spacer y={70} />

        <Button
          onClick={() => {
            navigate('/record');
          }}
        >
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

        <Spacer y={50} />

        <Typography
          align="center"
          sx={{
            fontSize: '12px',
          }}
        >
          Copyright 2024 DDOK-DDAK All Right Reserved.
        </Typography>
      </Container>
    </>
  );
}
