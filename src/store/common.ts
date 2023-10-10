import { atom, selector } from 'recoil';
import { signInUpNextButtonState, signInUpStepInstruction, signUpStep } from './signUp';
import { resetPWNextButtonState, resetPWStep, resetPWStepInstruction } from './resetPW';


export interface INextButtonState {
  isDisabled: boolean,
  clickHandler: () => void,
  text: string
}

export const stepType = atom({
  key: 'StepType',
  default: 'SIGNUP'
});

export const stepButtonProps = selector({
  key: 'StepButtonProps',
  get: ({get}) => {
    if (get(stepType) === 'SIGNUP') {
      return get(signInUpNextButtonState);
    } else {
      return get(resetPWNextButtonState);
    }
  },
  set: ({get, set}, newValue) => {
    if (get(stepType) === 'SIGNUP') {
      set(signInUpNextButtonState, newValue);
    } else {
      set(resetPWNextButtonState, newValue);
    }   
  },
});

export const stepInstruction = selector({
  key: 'StepInstruction',
  get: ({get}) => {
    return get(get(stepType) === 'SIGNUP' ? signInUpStepInstruction : resetPWStepInstruction);
  },
  set: ({set, get}, newValue) => {
    if (get(stepType) === 'SIGNUP') {
      set(signInUpStepInstruction, newValue);
    } else {
      set(resetPWStepInstruction, newValue);
    }   
  }
});

export const stepIndex = selector({
  key: 'StepIndex',
  get: ({get}) => {
    return get(get(stepType) === 'SIGNUP' ? signUpStep : resetPWStep);
  },
  set: ({set, get}, newValue) => {
    set(get(stepType) === 'SIGNUP' ? signUpStep : resetPWStep, newValue);
  }
});
