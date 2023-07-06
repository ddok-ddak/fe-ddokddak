import { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { SignUpStepState } from '@/store/signUp';

export function useSignUpStepForm(steps: ReactElement[]) {

  const [currentStepIndex, setCurrentStepIndex] = useRecoilState(SignUpStepState);

  /**
   * handle next button
   */
  function handleNextButton() {
    setCurrentStepIndex(i => {     
      if (i < steps.length - 1) {
        return i + 1;
      } else {
        return i;
      }
    });

  }

  /**
   * handle prev button
   */
  function handlePrevButton() {
    setCurrentStepIndex(i => {
      return (i <= 0) ? i : i - 1;
    });
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    handleNextButton,
    handlePrevButton
  }
};