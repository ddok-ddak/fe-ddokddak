import { stepButtonProps, stepInstruction } from '@/store/common';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import InputForm from '../common/InputForm';

const VerifyPW = (props: any) => {
  const [helper, setHelper] = useState('');
  const [isHelperError, setIsHelperError] = useState(true);
  const [password, setPassword] = useState('');

  const setInstruction = useSetRecoilState(stepInstruction);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);

  // password items
  const itemArray: InputItemType[] = [
    {
      name: '비밀번호',
      placeholder: '현재 비밀번호를 입력해주세요.',
      type: 'password',
      onChangeHandler: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      ) => {
        const value = event.target.value;
        setPassword(value);

        const passwd = 'qwe123!@#'; // TODO: replace with the api
        if (passwd === value) {
          setHelper('');
          setIsHelperError(() => false);
          setNextButtonProps({
            ...nextButtonProps,
            isDisabled: false,
          });
          // checkPasswordMatch(value, confirmPassword);
        } else {
          setHelper('현재 비밀번호와 일치하지 않습니다.');
          setIsHelperError(() => true);
        }
      },
    },
  ];

  useEffect(() => {
    setInstruction('현재 비밀번호를 입력해주세요');
    setNextButtonProps({
      ...nextButtonProps,
      isDisabled: true,
      clickHandler: props.handleNextButton,
    });
  }, []);

  return (
    <InputForm
      key="password1"
      itemArray={itemArray}
      helper={helper}
      isHelperError={true}
      value={password}
    />
  );
};

export default VerifyPW;
