import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  LinearProgress,
  LinearProgressProps,
  Box,
  Button,
  Container,
} from '@mui/material';
import Typography from '@mui/material/Typography';

import { useSignUpStepForm } from '@/hooks/signUpSteps';
import CheckTermsAndConditions from './CheckTermsAndConditions';
import SetEmail from './SetEmail';
import VerifyCode from './VerifyCode';
import SetPW from './SetPW';
import SetNickname from './SetNickname';
import { SignUpStepState, SignUpDataState } from '@/store/signUp';

const SignUp = () => {
  const currentStepIndex = useRecoilValue(SignUpStepState);
  const [signUpData, setSignUpData] = useRecoilState(SignUpDataState);

  /**
   * custom hook for sign up form
   */
  const { steps, handleNextButton, handlePrevButton } 
    = useSignUpStepForm([ <CheckTermsAndConditions/>, <SetEmail/>, <VerifyCode/>, <SetPW/>, <SetNickname/> ]);

  /**
   * linear progress component
   * @param props props
   * @returns linear progress
   */
  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number },
  ) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <Box sx={{ minWidth: 35, mb: '5px', mr: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', justifyContent: 'flex-end', color: '#B7B7B7', fontSize: '13px' }}
          >
            {`${currentStepIndex + 1} / ${steps.length}`}
          </Typography>
        </Box>
        <Box sx={{ m: 0.5 }}>
          <LinearProgress
            variant="determinate"
            {...props}
            sx={{ width: '100%', backgroundColor: '#DDDDDD !important' }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: 2,
          fontWeight: '700',
          fontSize: '18px',
          color: '#222222',
        }}
      >
        <Button
          sx={{
            fontWeight: '400',
            fontSize: '13px',
            color: '#949494',
            justifyContent: 'flex-start',
          }}
          onClick={handlePrevButton}
        >
          뒤로
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            sx={{
              justifyContent: 'flex-end',
              color: '#222222',
              fontWeight: '700',
              fontSize: '18px',
            }}
          > 
            약관동의 
          </Typography>
        </Box>
        <LinearProgressWithLabel value={Math.round(((currentStepIndex + 1) / steps.length) * 100)}/>
      </Container>
      <Container>
        {React.cloneElement(steps[currentStepIndex], {handleNextButton})}
      </Container>
    </Box>
  );
};

export default SignUp;
