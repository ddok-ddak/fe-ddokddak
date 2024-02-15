import Logo from '@/components/auth/Logo';
import {
  stepButtonProps,
  stepInstruction,
  currentFormType,
} from '@/store/common';
import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import FormWrapper from '../common/FormWrapper';
import InputForm, { InputItemType } from '../common/InputForm';

import SocialLogin from './SocialLogin';
import { checkPattern } from '@/hooks/checkPattern';
import { signIn } from '@/api/auth';
import { modalState } from '@/store/modal';

const { checkEmailValidity } = checkPattern();

export default function Login() {
  const setStepType = useSetRecoilState(currentFormType);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);

  const setInstruction = useSetRecoilState(stepInstruction);
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [helper1, setHelper1] = useState('');
  const [isHelperError1, setIsHelperError1] = useState(true);

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
    setNextButtonProps({
      ...nextButtonProps,
      isDisabled: !(!isHelperError1 && email !== '' && password !== ''),
      clickHandler: async () => {
        await signIn({ email, password })
          .then((response) => {
            if (response.status !== 'SUCCESS') {
              setModalInfo({
                ...modalInfo,
                title: '로그인 오류',
                msg: '이메일 혹은 비밀번호를 다시 확인 해주세요.',
                open: true,
                isShowConfirmBtn: true,
              });
            }
          })
          .catch((error) => {
            setModalInfo({
              ...modalInfo,
              title: '서버 오류',
              msg: '오류가 발생했습니다. 다시 시도 해주세요.',
              open: true,
              isShowConfirmBtn: true,
            });
          });
      },
    });
  }, [email, password]);

  useEffect(() => {
    setStepType('LOGIN');
    setInstruction('');
    setNextButtonProps({
      ...nextButtonProps,
      text: '로그인',
      isDisabled: false,
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
                helper={helper1}
                isHelperError={isHelperError1}
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
            {'회원가입'}
          </Button>
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
          Copyright 2024 DDOK-DDAK All Right Reserved.
        </Typography>
      </Container>
    </>
  );
}
