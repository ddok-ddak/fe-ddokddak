import { atom, selector } from 'recoil';
import {
  signInUpNextButtonState,
  signInUpStepInstruction,
  signUpStep,
} from './signUp';
import {
  resetPWNextButtonState,
  resetPWStep,
  resetPWStepInstruction,
} from './resetPW';
import {
  currentPeriodForRecord,
  currentSelectedDateForRecord,
  recordEditNextButtonState,
} from './record';
import {
  currentPeriodForStat,
  currentPeriodForView,
  currentSelectedDateForStat,
} from './statistics';
import { setModeNextButtonState } from './auth';
import { deleteCategoryButtonState } from './category';

/* ============ STEP FORM (SignUp Pages / PW Reset Pages / Record Edit Page) ============ */
export interface INextButtonState {
  isDisabled: boolean;
  clickHandler: () => void;
  text: string;
}

/**
 * SIGNUP 회원 가입
 * LOGIN 로그인
 * RECORD 기록 (삭제)
 * RESETPW 비밀번호 재설정
 * SETTEMPLATE 템플릿 모드 (유저 모드) 설정
 * CATEGORY 카테고리 (삭제)
 */
export type FormType =
  | 'SIGNUP'
  | 'LOGIN'
  | 'RECORD'
  | 'RESETPW'
  | 'SETTEMPLATE'
  | 'CATEGORY';

export const currentFormType = atom<FormType>({
  key: 'CurrentFormType',
  default: 'SIGNUP',
});

export const stepButtonProps = selector({
  key: 'StepButtonProps',
  get: ({ get }) => {
    const type = get(currentFormType);
    if (type === 'SIGNUP') {
      return get(signInUpNextButtonState);
    } else if (type === 'LOGIN') {
      return get(resetPWNextButtonState);
    } else if (type === 'RECORD') {
      return get(recordEditNextButtonState);
    } else if (type === 'SETTEMPLATE') {
      return get(setModeNextButtonState);
    } else if (type === 'CATEGORY') {
      return get(deleteCategoryButtonState);
    } else {
      return get(recordEditNextButtonState);
    }
  },
  set: ({ get, set }, newValue) => {
    const type = get(currentFormType);
    if (type === 'SIGNUP') {
      set(signInUpNextButtonState, newValue);
    } else if (type === 'LOGIN') {
      set(resetPWNextButtonState, newValue);
    } else if (type === 'RECORD') {
      set(recordEditNextButtonState, newValue);
    } else if (type === 'SETTEMPLATE') {
      set(setModeNextButtonState, newValue);
    } else if (type === 'CATEGORY') {
      set(deleteCategoryButtonState, newValue);
    } else {
      set(recordEditNextButtonState, newValue);
    }
  },
});

export const stepInstruction = selector({
  key: 'StepInstruction',
  get: ({ get }) => {
    return get(
      get(currentFormType) === 'SIGNUP'
        ? signInUpStepInstruction
        : resetPWStepInstruction,
    );
  },
  set: ({ set, get }, newValue) => {
    if (get(currentFormType) === 'SIGNUP') {
      set(signInUpStepInstruction, newValue);
    } else {
      set(resetPWStepInstruction, newValue);
    }
  },
});

export const stepIndex = selector({
  key: 'StepIndex',
  get: ({ get }) => {
    return get(get(currentFormType) === 'SIGNUP' ? signUpStep : resetPWStep);
  },
  set: ({ set, get }, newValue) => {
    set(get(currentFormType) === 'SIGNUP' ? signUpStep : resetPWStep, newValue);
  },
});

/* ============ CUSTOM CALENDAR (Record Pages / Statistic Pages) ============ */

/**
 * Custom Calender Type
 *
 * RECORD: Calendar for Record Page
 * STAT: Calendar for Statistic Page
 * VIEW: Monthly Calendar for Statistic Page
 */
export type customCalendarType = 'RECORD' | 'STAT' | 'VIEW';

export const currentCalendarType = atom<customCalendarType>({
  key: 'CurrentCalendarType',
  default: 'RECORD',
});

export const currentSelectedDate = selector({
  key: 'CurrentSelectedDate',
  get: ({ get }) => {
    const type = get(currentCalendarType);
    if (type === 'RECORD') {
      return get(currentSelectedDateForRecord);
    } else if (type === 'STAT') {
      return get(currentSelectedDateForStat);
    }
  },
  set: ({ get, set }, newValue: any) => {
    const type = get(currentCalendarType);
    if (type === 'RECORD') {
      set(currentSelectedDateForRecord, newValue);
    } else if (type === 'STAT') {
      set(currentSelectedDateForStat, newValue);
    }
  },
});

export const currentPeriod = selector({
  key: 'CurrentPeriod',
  get: ({ get }) => {
    const type = get(currentCalendarType);
    if (type === 'RECORD') {
      return get(currentPeriodForRecord);
    } else if (type === 'STAT') {
      return get(currentPeriodForStat);
    } else if (type === 'VIEW') {
      return get(currentPeriodForView);
    }
  },
  set: ({ get, set }, newValue: any) => {
    const type = get(currentCalendarType);
    if (type === 'RECORD') {
      set(currentPeriodForRecord, newValue);
    } else if (type === 'STAT') {
      set(currentPeriodForStat, newValue);
    } else if (type === 'VIEW') {
      set(currentPeriodForView, newValue);
    }
  },
});

// export const currentPeriodTypeList = selector({
//   key: 'CurrentPeriodTypeList',
//   get: ({ get }) => {
//     const type = get(currentCalendarType);
//     if (type === 'RECORD') {
//       return get(periodForRecordList);
//     } else if (type === 'STAT') {
//       return get(periodForStatList);
//     } else if (type === 'VIEW') {
//       return get(periodForViewList);
//     }
//   },
// });
