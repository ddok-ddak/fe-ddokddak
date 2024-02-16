import { Box, LinearProgress, LinearProgressProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useSignUpStepForm } from '@/hooks/signUpSteps';
import { currentFormType, stepIndex } from '@/store/common';
import SetPW from './SetPW';
import FormWrapper from '../common/FormWrapper';
import VerifyCode from '../common/VerifyCode';
import Wrapper from '../common/Wrapper';
import CheckTermsAndConditions from './CheckTermsAndConditions';
import SetEmail from './SetEmail';
import SetNickname from './SetNickname';
import CommonHeader from '@/components/layout/CommonHeader';
import { theme } from '@/styles';
import { buttonText } from '@/constants/message';

const SignUp = () => {
  const currentStepIndex = useRecoilValue(stepIndex);
  const setStepType = useSetRecoilState(currentFormType);

  useEffect(() => {
    setStepType('SIGNUP');
  }, []);

  /**
   * custom hook for sign up form
   */
  const { steps, handleNextButton, handlePrevButton } = useSignUpStepForm([
    <CheckTermsAndConditions />,
    <SetEmail />,
    <VerifyCode />,
    <SetPW />,
    <SetNickname />,
  ]);

  /**
   * linear progress component
   * @param props props
   * @returns linear progress
   */
  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number },
  ) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ minWidth: 35, mb: '5px', mr: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              color: 'grey.400',
              fontSize: '13px',
            }}
          >
            {`${currentStepIndex + 1} / ${steps.length}`}
          </Typography>
        </Box>
        <Box sx={{ m: 0.5 }}>
          <LinearProgress
            variant="determinate"
            sx={{ width: '100%', backgroundColor: theme.palette.grey![300] }}
            {...props}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Wrapper
      headerComp={
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CommonHeader
            title={''}
            isShowPrevButton={true}
            prevButtonText={buttonText.prev}
            onClickPrevButton={handlePrevButton}
            isShowNextButton={false}
          />
          <Typography
            sx={{
              width: '100%',
              textAlign: 'center',
              color: 'grey.700',
              fontWeight: '700',
              fontSize: '18px',
            }}
          >
            약관동의
          </Typography>
          <LinearProgressWithLabel
            value={Math.round(((currentStepIndex + 1) / steps.length) * 100)}
          />
        </Box>
      }
    >
      <FormWrapper
        children={React.cloneElement(steps[currentStepIndex], {
          handleNextButton,
        })}
      />
    </Wrapper>
  );
};

export default SignUp;
