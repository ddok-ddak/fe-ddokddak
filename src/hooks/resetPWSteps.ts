
import { resetPWCompletePopupShow, resetPWStep } from '@/store/resetPW';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

export function useResetPWSteps(steps: ReactElement[]) {

  const [currentStepIndex, setCurrentStepIndex] = useRecoilState(resetPWStep);
  const setCompletePopupShow = useSetRecoilState(resetPWCompletePopupShow);
  const navigate = useNavigate();

  /**
   * handle next button
   */
  function handleNextButton() {
    const currIdx = currentStepIndex;
    if (currIdx < steps.length - 1) {
      setCurrentStepIndex(currIdx + 1);
    } else {
      navigate('/settings');
      setCompletePopupShow(true);
    }
  }

  /**
   * handle prev button
   */
  function handlePrevButton() {
    const currIdx = currentStepIndex;
    if (currIdx === 0) {
      navigate('/settings', { replace: true });
    } else {
      setCurrentStepIndex(() => currIdx - 1);
    }
  }


  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    handleNextButton,
    handlePrevButton
  }
};