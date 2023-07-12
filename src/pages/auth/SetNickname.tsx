import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addUser, checkDuplicatedNickname } from '@/api/auth';
import { SignUpDataState, SignUpNextButtonState, SignUpStepInstruction } from '@/store/signUp';

import InputForm, { InputItemType } from './InputForm';
import FormWrapper from './FormWrapper';


const SetNickname = (props: any) => {
  const [signUpNextButtonProps, setSignUpNextButtonProps] = useRecoilState(SignUpNextButtonState);
  const [signUpData, setSignUpData] = useRecoilState(SignUpDataState);
  const setSignUpStepInstruction = useSetRecoilState(SignUpStepInstruction);

  const [nickname, setNickname] = useState(signUpData.nickname);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [helper, setHelper] = useState('');
  const [isHelperError, setIsHelperError] = useState(true);

  const itemArray: InputItemType[] = [
    {
      name: '닉네임',
      placeholder: '영어, 숫자, _, -를 사용한 2 ~ 15자리 이내',
      onChangeHandler: async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setNickname(value);

        const reg = /^[a-zA-Z0-9_-]{2,15}$/g;
        if (!reg.test(value)) {
          setHelper('영어, 숫자, _, - 를 사용한 2 ~ 15자리 이내로 입력해주세요.');
          setIsHelperError(true);
          setIsNextButtonDisabled(true);
          return true;
        } else {
          await checkDuplicatedNickname(value).then((response) => {
            let isAvail = false;
            if (response.status === 'SUCCESS') {
              setHelper('사용 가능한 닉네임입니다.');
              setIsNextButtonDisabled(isAvail);
              setSignUpData({...signUpData, nickname: value});
            } else {
              isAvail = true;
              setHelper('이미 사용하고 있는 닉네임입니다.');
            }
            setIsHelperError(isAvail);
            setSignUpNextButtonProps({
              ...signUpNextButtonProps,
              isDisabled: isAvail,
            });    
          });
        }
      }
    },
  ];

  useEffect(() => {
    setSignUpStepInstruction('닉네임을 입력해주세요.');
    setSignUpNextButtonProps({
      text: '회원가입 완료',
      isDisabled: true,
      clickHandler: async () => {
        await addUser(signUpData).then((response) => {
          if (response.status === 'SUCCESS') {
            alert('회원 가입 성공')
          } else {
            alert('회원 가입 실패')
          }
        });
      },
    });
  }, []);

  
  return (
    <FormWrapper>
      <InputForm 
        itemArray={itemArray}
        helper={helper}
        isHelperError={isHelperError}
        value={nickname}
      />
    </FormWrapper>
  );
};

export default SetNickname;
