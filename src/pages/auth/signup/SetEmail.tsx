import { checkDuplicatedEmail, requestCode } from '@/api/auth';
import { signUpDataState } from '@/store/signUp';
import { Button, InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { stepButtonProps, stepInstruction } from '@/store/common';
import InputForm, { InputItemType } from '../common/InputForm';
import { checkPattern } from '@/hooks/checkPattern';

const { checkEmailValidity } = checkPattern();

const SetEmail = (props: any) => {
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);
  const instruction = useSetRecoilState(stepInstruction);
  const [signUpData, setSignUpData] = useRecoilState(signUpDataState);

  const [email, setEmail] = useState(signUpData.email);
  const [disableDuplicateChkBtn, setDisableDuplicateChkBtn] = useState(true);
  const [helper, setHelper] = useState('');
  const [isHelperError, setIsHelperError] = useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setEmail(value);
    setIsNextButtonDisabled(() => true);
    if (email === '') {
      setDisableDuplicateChkBtn(() => true);
      setHelper('');
      return true;
    }

    if (checkEmailValidity(value)) {
      setDisableDuplicateChkBtn(false);
      setHelper('');
    } else {
      setDisableDuplicateChkBtn(() => true);
      setHelper('올바른 이메일 형태가 아닙니다.');
      setIsHelperError(() => true);
    }
  };

  const duplicateCheckerHandler = async (event: any) => {
    await checkDuplicatedEmail(email).then((response) => {
      if (response.status === 'SUCCESS') {
        setHelper('사용 가능한 이메일입니다.');
        setIsHelperError(false);
        setIsNextButtonDisabled(false);
        setDisableDuplicateChkBtn(false);
        setNextButtonProps({
          ...nextButtonProps,
          isDisabled: false,
        });
        setSignUpData({ ...signUpData, email });
      } else {
        setHelper('이미 가입된 이메일입니다.');
        setIsHelperError(() => true);
      }
    });
  };

  const itemArray: InputItemType[] = [
    {
      name: '이메일',
      placeholder: '이메일 주소를 입력해주세요.',
      duplicateCheckerButton: (
        <InputAdornment position="end">
          <Button
            onClick={duplicateCheckerHandler}
            disabled={disableDuplicateChkBtn}
            sx={{
              color: 'pink.600',
              fontSize: '13px',
              fontWeight: '400',
            }}
          >
            {'중복확인'}
          </Button>
        </InputAdornment>
      ),
      onChangeHandler: onChangeHandler,
      type: 'email',
    },
  ];

  useEffect(() => {
    setDisableDuplicateChkBtn(true);
    instruction('이메일을 입력해주세요.');
    setNextButtonProps({
      ...nextButtonProps,
      clickHandler: async () => {
        await requestCode(email).then((response: any) => {
          if (response.status === 'SUCCESS') {
            props.handleNextButton();
          }
        });
      },
      isDisabled: true,
    });
  }, []);

  return (
    <InputForm
      value={email}
      itemArray={itemArray}
      disableDuplicateChkBtn={disableDuplicateChkBtn}
      helper={helper}
      isHelperError={isHelperError}
    />
  );
};

export default SetEmail;
