import { stepButtonProps } from '@/store/common';
import { resetPWMode, resetPWStepInstruction } from '@/store/resetPW';
import { signUpDataState } from '@/store/signUp';
import { IconButton, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import InputForm, { InputItemType } from '../common/InputForm';

const SetPW = (props: any) => {
  const [signUpData, setSignUpData] = useRecoilState(signUpDataState);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);

  const [pWChgMode, setPWChgMode] = useRecoilState(resetPWMode);

  const [password, setPassword] = useState(signUpData.password);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [helper1, setHelper1] = useState('');
  const [helper2, setHelper2] = useState('');
  const [isHelperError1, setIsHelperError1] = useState(true);
  const [isHelperError2, setIsHelperError2] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const setStepInstruction = useSetRecoilState(resetPWStepInstruction);

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
    setNextButtonProps({
      ...nextButtonProps,
      isDisabled: isMatch,
    });
  };


  const setDisplayButton = () => {
    if (pWChgMode !== 'CURRENT') {
      return <></>;
    }
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          edge="end"
          sx={{
            color: 'pink.600',
            fontSize: '13px',
            fontWeight: '400',
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.7963 9.43358C2.73289 9.60671 2.60447 9.74829 2.43832 9.82824C2.27218 9.90819 2.08141 9.9202 1.90655 9.86173C1.73169 9.80326 1.58652 9.67891 1.50189 9.5151C1.41725 9.3513 1.39982 9.16095 1.4533 8.9845C1.4785 8.9065 1.50781 8.82847 1.54114 8.75358C1.5978 8.619 1.68139 8.43342 1.79614 8.21383C2.02989 7.77467 2.39397 7.18958 2.93089 6.6045C4.01464 5.42158 5.78972 4.25 8.4998 4.25C11.2099 4.25 12.985 5.42158 14.0687 6.6045C14.6472 7.23913 15.1163 7.96536 15.4571 8.75358L15.5222 8.91367C15.5265 8.925 15.5406 8.99867 15.5548 9.0695L15.5831 9.20833C15.5831 9.20833 15.7021 9.68008 15.0986 9.87983C14.9209 9.93919 14.7269 9.9257 14.5591 9.84233C14.3913 9.75896 14.2634 9.61249 14.2033 9.435V9.43075L14.1948 9.40808C14.1236 9.2261 14.0423 9.04826 13.9511 8.87542C13.6992 8.40015 13.3879 7.95886 13.0246 7.56217C12.1605 6.62008 10.7481 5.66667 8.4998 5.66667C6.25155 5.66667 4.83914 6.62008 3.97497 7.56217C3.5071 8.0751 3.12663 8.66137 2.84872 9.29758C2.83386 9.33415 2.81969 9.37099 2.80622 9.40808L2.7963 9.43358ZM5.66647 9.91667C5.66647 9.16522 5.96498 8.44455 6.49634 7.9132C7.02769 7.38184 7.74836 7.08333 8.4998 7.08333C9.25125 7.08333 9.97192 7.38184 10.5033 7.9132C11.0346 8.44455 11.3331 9.16522 11.3331 9.91667C11.3331 10.6681 11.0346 11.3888 10.5033 11.9201C9.97192 12.4515 9.25125 12.75 8.4998 12.75C7.74836 12.75 7.02769 12.4515 6.49634 11.9201C5.96498 11.3888 5.66647 10.6681 5.66647 9.91667Z"
              fill="#B7B7B7"
            />
          </svg>
        </IconButton>
      </InputAdornment>
    );
  };

  // password items
  const itemArray1: InputItemType[] = [
    {
      name: '비밀번호',
      placeholder: '영어, 숫자, 특수문자를 포함한 8~15자리 이내',
      type: showPassword ? 'text' : 'password',
      onChangeHandler: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      ) => {
        const value = event.target.value;
        setPassword(value);

        const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
        if (reg.test(value)) {
          setHelper1('사용 가능한 비밀번호입니다.');
          setIsHelperError1(() => false);
          // checkPasswordMatch(value, confirmPassword);
          setNextButtonProps({
            ...nextButtonProps,
            isDisabled: false,
          });
        } else {
          setHelper1(
            '영어, 숫자, 특수문자를 모두 포함한 8 ~ 15자리 이내로 입력해주세요.',
          );
          setIsHelperError1(() => true);
        }
      },
      duplicateCheckerButton: setDisplayButton(),
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
    setPassword('');
    setStepInstruction('새로운 비밀번호를 입력해주세요.');
    setNextButtonProps({
      text: '변경 완료',
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
      {pWChgMode !== 'CURRENT' && (
        <InputForm
          key="password2"
          itemArray={itemArray2}
          helper={helper2}
          isHelperError={isHelperError2}
        />
      )}
    </>
  );
};

export default SetPW;
