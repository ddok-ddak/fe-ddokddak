import { stepIndex } from '@/store/common';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export function useSignUpStepForm(steps: ReactElement[]) {

  const [currentStepIndex, setCurrentStepIndex] = useRecoilState(stepIndex);
  const navigate = useNavigate();

  /**
   * handle next button
   */
  function handleNextButton() {

    const currIdx = currentStepIndex;
    setCurrentStepIndex(() => (currIdx < steps.length - 1) ? (currIdx + 1) : currIdx);
  }

  /**
   * handle prev button
   */
  function handlePrevButton() {
    const currIdx = currentStepIndex;
    if (currIdx <= 0) {
      navigate('/login', { replace: true });
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