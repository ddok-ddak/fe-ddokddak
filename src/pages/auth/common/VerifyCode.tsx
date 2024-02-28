import { Box, Button, InputAdornment, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Modal from '@/components/common/Modal';
import { stepButtonProps, stepIndex, stepInstruction } from '@/store/common';
import { modalState } from '@/store/modal';
import InputForm, { InputItemType } from './InputForm';
import { modalAnswer } from '@/constants/message';
import { useModalCommon } from '@/hooks/modalCommon';
import { verifyCode } from '@/api/auth';

const VerifyCode = (props: any) => {
  const { closeModal } = useModalCommon();

  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  const [currentStepIndex, setCurrentStepIndex] = useRecoilState(stepIndex);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);
  const setInstruction = useSetRecoilState(stepInstruction);

  const [helper, setHelper] = useState('');
  const [isHelperError, setIsHelperError] = useState(true);
  const [requestCodeCount, setRequestCodeCount] = useState(0);
  const [verificationAttemptCount, setVerificationAttemptCount] = useState(0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [code, setCode] = useState('');

  const itemArray: InputItemType[] = [
    {
      name: '이메일 인증 코드',
      placeholder: '인증 코드를 입력해주세요.',
      duplicateCheckerButton: (
        <InputAdornment position="end">
          <Countdown
            date={Date.now() + 180000}
            renderer={({ formatted }) => {
              return (
                <span>
                  {formatted.minutes}:{formatted.seconds}
                </span>
              );
            }}
          />
        </InputAdornment>
      ),
      verifyCodeRequestButton: (
        <Button
          onClick={async () => {
            const requestCount = requestCodeCount;
            if (requestCount < 5) {
              setRequestCodeCount(requestCount + 1);
              // TODO: check verification code
            } else {
              setModalInfo({
                open: true,
                title:
                  '인증 요청 제한 횟수(5회)를 초과했습니다. 다른 이메일로 시도하시겠습니까? ',
                msg: '그렇지 않은 경우 해당 이메일로는 24시간 후에 시도할 수 있습니다.',
                btn1Text: modalAnswer.no,
                btn1ClickHandler: closeModal,
                btn2Text: modalAnswer.yes,
                btn2ClickHandler: () => {
                  setCurrentStepIndex(currentStepIndex - 1);
                  closeModal();
                },
              });
            }
          }}
          sx={{
            height: '29px',
            width: '120px',
            margin: '16px 0 8px 10px',
            justifyContent: 'center',
            radius: '5px',
            backgroundColor: 'grey.200',
          }}
        >
          <Typography
            sx={{
              fontSize: '11px',
              color: 'grey.500',
            }}
          >
            인증코드 재요청
          </Typography>
        </Button>
      ),
      verifyCodeRequestHandler: () => {
        // TODO: request code
      },
      onChangeHandler: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      ) => {
        const value = event.target.value;
        if (value.length) {
          setCode(value);
          setIsNextButtonDisabled(false);
          setNextButtonProps({
            ...nextButtonProps,
            isDisabled: false,
          });
        }
      },
    },
  ];

  useEffect(() => {
    setInstruction('인증코드를 입력해주세요.');
    setNextButtonProps({
      text: '인증 완료',
      clickHandler: async () => {
        setCurrentStepIndex(currentStepIndex + 1);
        if (verificationAttemptCount >= 5) {
          setModalInfo({
            open: true,
            title:
              '인증코드 입력 횟수(5회)를 초과했습니다. 다른 이메일로 시도하시겠습니까? ',
            msg: '그렇지 않은 경우 해당 이메일로는 24시간 후에 시도할 수 있습니다.',
            btn1Text: modalAnswer.no,
            btn1ClickHandler: closeModal,
            btn2Text: modalAnswer.yes,
            btn2ClickHandler: () => {
              closeModal();
              setCurrentStepIndex(currentStepIndex - 1);
              // TODO: block the email use for 24h
              // TODO: reset email
            },
          });
          return true;
        }

        // TODO: check the code
        const response = true;
        await verifyCode({
          authenticationRequestId: 0,
          authenticationNumber: code,
        })
          .then((response) => {
            console.log(response);
            if (response.status === 'SUCCESS') {
              // props.handleNextButton(); //
            } else {
              let newAttemptCount = verificationAttemptCount + 1;
              setVerificationAttemptCount(newAttemptCount);
              setHelper(
                `인증코드가 일치하지 않습니다. 다시 한번 확인 후 입력해주세요. (${newAttemptCount} / 5 회)`,
              );
              setIsHelperError(() => true);
            }
          })
          .catch();
      },
      isDisabled: true,
    });
  }, []);

  return (
    <>
      <Modal />
      <InputForm
        itemArray={itemArray}
        helper={helper}
        isHelperError={isHelperError}
        value={code}
      />
      <Box sx={{ position: 'relative', top: '15%' }}>
        <Typography
          sx={{
            fontSize: '11px',
            color: 'grey.500',
          }}
        >
          ! 인증 코드가 오지 않으면 스팸함을 확인해주세요. <br />
          스팸함에도 인증 코드 메일이 오지 않았다면 dodone@gmail.com으로 문의를
          남겨주세요. 감사합니다.
        </Typography>
      </Box>
    </>
  );
};

export default VerifyCode;
