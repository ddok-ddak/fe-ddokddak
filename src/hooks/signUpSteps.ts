import { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { SignUpStepState } from '@/store/signUp';

export function useSignUpStepForm(steps: ReactElement[]) {

  const [currentStepIndex, setCurrentStepIndex] = useRecoilState(SignUpStepState);

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
    setCurrentStepIndex(() => (currIdx <= 0) ? currIdx : currIdx - 1);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    handleNextButton,
    handlePrevButton
  }
};