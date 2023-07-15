import React, { useState, useEffect} from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { InputAdornment, Button } from '@mui/material';
import { checkDuplicatedEmail } from '@/api/auth';
import { SignUpDataState, SignUpNextButtonState, SignUpStepInstruction } from '@/store/signUp';

import FormWrapper from './FormWrapper';
import InputForm, { InputItemType } from './InputForm';

const SetEmail = (props: any) => {
  const [signUpNextButtonProps, setSignUpNextButtonProps] = useRecoilState(SignUpNextButtonState);
  const [signUpData, setSignUpData] = useRecoilState(SignUpDataState);
  const setSignUpStepInstruction = useSetRecoilState(SignUpStepInstruction);

  const [email, setEmail] = useState(signUpData.email);
  const [disableDuplicateChkBtn, setDisableDuplicateChkBtn] = useState(true);
  const [helper, setHelper] = useState('');
  const [isHelperError, setIsHelperError] = useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setIsNextButtonDisabled(() => (true));
    if (email === '') {
      setDisableDuplicateChkBtn(() => (true));
      setHelper('');
      return true;
    }

    const isMailValidPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    if (isMailValidPattern) {
      setDisableDuplicateChkBtn(false);
      setHelper('');
    } else {
      setDisableDuplicateChkBtn(() => (true));
      setHelper('올바른 이메일 형태가 아닙니다.');
      setIsHelperError(() => (true));
    }
  };
  
  const duplicateCheckerHandler = async (event: any) => {
    await checkDuplicatedEmail(email).then((response) => {
      if (response.status === 'SUCCESS') {
        setHelper('사용 가능한 이메일입니다.');
        setIsHelperError(false);
        setIsNextButtonDisabled(false);
        setDisableDuplicateChkBtn(false);
        setSignUpNextButtonProps({
          ...signUpNextButtonProps,
          isDisabled: false,
        });
        setSignUpData({...signUpData, email});
      } else {
        setHelper('이미 가입된 이메일입니다.');
        setIsHelperError(() => (true));
      }
    });
  };
  
  const itemArray: InputItemType[] = [
    {
      name: '이메일',
      placeholder: '이메일 주소를 입력해주세요.',
      duplicateCheckerButton:(
      <InputAdornment position="end"> 
        <Button
          onClick={duplicateCheckerHandler}
          disabled={disableDuplicateChkBtn}
          sx={{
            color: '#FF8999',
            fontSize: '13px',
            fontWeight: '400'
          }}
        >
          {'중복확인'}
        </Button>
      </InputAdornment>
      ),
      onChangeHandler,
      type: 'email'
    },
  ];
  
  useEffect(() => {
    setDisableDuplicateChkBtn(true);
    setSignUpStepInstruction('이메일을 입력해주세요.');
    setSignUpNextButtonProps({
      ...signUpNextButtonProps,
      clickHandler: props.handleNextButton,
      isDisabled: true,
    });
  }, []);

  return (
    <FormWrapper>
      <InputForm
        value={email}
        itemArray={itemArray}
        disableDuplicateChkBtn={disableDuplicateChkBtn} 
        helper={helper}
        isHelperError={isHelperError}
      />
    </FormWrapper>
  );
};

export default SetEmail;
