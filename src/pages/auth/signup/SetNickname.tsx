import { addUser, checkDuplicatedNickname } from '@/api/auth';
import {
  signInUpNextButtonState,
  signUpDataState,
  signInUpStepInstruction,
} from '@/store/signUp';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import InputForm, { InputItemType } from '../common/InputForm';
import { useNavigate } from 'react-router-dom';

const SetNickname = (props: any) => {
  const [signUpNextButtonProps, setSignUpNextButtonProps] = useRecoilState(
    signInUpNextButtonState,
  );
  const [signUpData, setSignUpData] = useRecoilState(signUpDataState);
  const setSignUpStepInstruction = useSetRecoilState(signInUpStepInstruction);

  const [nickname, setNickname] = useState(signUpData.nickname);

  const refValue = useRef('');

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [helper, setHelper] = useState('');
  const [isHelperError, setIsHelperError] = useState(true);
  const navigation = useNavigate();
  useEffect(() => {
    refValue.current = nickname;
  }, [nickname]);


  const itemArray: InputItemType[] = [
    {
      name: '닉네임',
      placeholder: '영어, 숫자, _, -를 사용한 2 ~ 15자리 이내',
      onChangeHandler: async (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      ) => {
        const value = event.target.value;
        setNickname(() => value);

        const reg = /^[a-zA-Z0-9_-]{2,15}$/g;
        let isNotAvail = true;
        if (!reg.test(refValue.current)) {
          setHelper(
            '영어, 숫자, _, - 를 사용한 2 ~ 15자리 이내로 입력해주세요.',
          );
          setIsHelperError(isNotAvail);
          setIsNextButtonDisabled(isNotAvail);
        } else {
          await checkDuplicatedNickname(refValue.current).then((response) => {
            if (response.status === 'SUCCESS') {
              isNotAvail = false;
              setHelper('사용 가능한 닉네임입니다.');
              setSignUpData({ ...signUpData, nickname: refValue.current });
            } else {
              setHelper('이미 사용하고 있는 닉네임입니다.');
            }
            setIsNextButtonDisabled(isNotAvail);
            setIsHelperError(isNotAvail);
            setSignUpNextButtonProps({
              ...signUpNextButtonProps,
              isDisabled: isNotAvail,
            });
          });
        }
      },
    },
  ];

  useEffect(() => {
    setSignUpStepInstruction('닉네임을 입력해주세요.');
    setSignUpNextButtonProps({
      text: '회원가입 완료',
      isDisabled: true,
      clickHandler: async () => {
        await addUser({ ...signUpData, nickname: refValue.current }).then((response) => {
          if (response.status === 'SUCCESS') {
            navigation('/statistics');
          } else {
            alert('회원 가입 실패');
          }
        });
      },
    });
  }, [nickname]);

  return (
    <InputForm
      itemArray={itemArray}
      helper={helper}
      isHelperError={isHelperError}
      value={nickname}
    />
  );
};

export default SetNickname;
