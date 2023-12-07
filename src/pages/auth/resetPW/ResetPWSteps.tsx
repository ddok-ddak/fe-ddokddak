import { useRecoilState, useSetRecoilState } from 'recoil';

import { useResetPWSteps } from '@/hooks/resetPWSteps';
import { stepIndex, currentFormType } from '@/store/common';
import { resetPWMode } from '@/store/resetPW';
import React, { useEffect, useState } from 'react';
import FormWrapper from '../common/FormWrapper';
import VerifyCode from '../common/VerifyCode';
import Wrapper from '../common/Wrapper';
import ResetPW from './ResetPW';
import ResetPWMode from './ResetPWMode';
import VerifyPW from './VerifyPW';
import CommonHeader from '@/components/layout/CommonHeader';

const ResetPWStep = () => {
  const setStepType = useSetRecoilState(currentFormType);
  const [currentStepIndex, setCurrentStepIndex] = useRecoilState(stepIndex);
  const [pWChgMode, setPWChgMode] = useRecoilState(resetPWMode);

  /**
   * custom hook for reset pw steps
   */
  const resetPWSteps = useResetPWSteps([
    <ResetPWMode />,
    <VerifyPW />,
    <ResetPW />,
  ]);
  const [steps, setSteps] = useState(resetPWSteps.steps);
  const handlePrevButton = resetPWSteps.handlePrevButton;
  const handleNextButton = resetPWSteps.handleNextButton;

  useEffect(() => {
    setStepType('RESETPW');
  }, []);

  useEffect(() => {
    setSteps(
      pWChgMode === 'CURRENT'
        ? [<ResetPWMode />, <VerifyPW />, <ResetPW />]
        : [<ResetPWMode />, <VerifyCode />, <ResetPW />],
    );
  }, [pWChgMode]);

  return (
    <Wrapper
      headerComp={
        <CommonHeader
          title={'비밀번호 변경'}
          isShowPrevButton={true}
          onClickPrevButton={handlePrevButton}
        />
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

export default ResetPWStep;
