import {
  signInUpNextButtonState,
  signUpDataState,
  signInUpStepInstruction,
} from '@/store/signUp';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import InputForm, { InputItemType } from '../common/InputForm';
import { checkPattern } from '@/hooks/checkPattern';
import { buttonText } from '@/constants/message';

const { checkPasswordValidity } = checkPattern();

const SetPW = (props: any) => {
  const [signUpData, setSignUpData] = useRecoilState(signUpDataState);
  const [signUpNextButtonProps, setSignUpNextButtonProps] = useRecoilState(
    signInUpNextButtonState,
  );
  const setSignUpStepInstruction = useSetRecoilState(signInUpStepInstruction);

  const [password, setPassword] = useState(signUpData.password);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [helper1, setHelper1] = useState('');
  const [helper2, setHelper2] = useState('');
  const [isHelperError1, setIsHelperError1] = useState(true);
  const [isHelperError2, setIsHelperError2] = useState(true);

  /**
   * compare two passwords
   * @param value
   * @param compareValue
   */
  const checkPasswordMatch = (value: string, compareValue: string) => {
    let isMatch = true;
    if (value === compareValue) {
      setHelper2(() => '동일한 비밀번호입니다.');
      isMatch = false;
      setIsHelperError2(() => isMatch);
      setIsNextButtonDisabled(() => isMatch);
      setSignUpData({ ...signUpData, password });
    } else {
      setHelper2('동일한 비밀번호를 입력해주세요.');
      setIsHelperError2(() => isMatch);
    }
    setSignUpNextButtonProps({
      ...signUpNextButtonProps,
      isDisabled: isMatch,
    });
  };

  // password items
  const itemArray1: InputItemType[] = [
    {
      name: '비밀번호',
      placeholder: '영어, 숫자, 특수문자를 포함한 8~15자리 이내',
      type: 'password',
      onChangeHandler: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      ) => {
        const value = event.target.value;
        setPassword(value);

        if (checkPasswordValidity(value)) {
          setHelper1('사용 가능한 비밀번호입니다.');
          setIsHelperError1(() => false);
          checkPasswordMatch(value, confirmPassword);
        } else {
          setHelper1(
            '영어, 숫자, 특수문자를 모두 포함한 8 ~ 15자리 이내로 입력해주세요.',
          );
          setIsHelperError1(() => true);
        }
      },
    },
  ];

  // confirm password items
  const itemArray2: InputItemType[] = [
    {
      name: '비밀번호 확인',
      placeholder: '비밀번호를 한번 더 입력해주세요.',
      type: 'password',
      onChangeHandler: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      ) => {
        const value = event.target.value;
        setConfirmPassword(value);
        checkPasswordMatch(value, password);
      },
    },
  ];

  useEffect(() => {
    setSignUpStepInstruction('비밀번호를 입력해주세요.');
    setSignUpNextButtonProps({
      text: buttonText.next,
      clickHandler: props.handleNextButton,
      isDisabled: true,
    });
  }, []);

  return (
    <>
      <InputForm
        key="password1"
        itemArray={itemArray1}
        helper={helper1}
        isHelperError={isHelperError1}
        value={password}
      />
      <InputForm
        key="password2"
        itemArray={itemArray2}
        helper={helper2}
        isHelperError={isHelperError2}
      />
    </>
  );
};

export default SetPW;
