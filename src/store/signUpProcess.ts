import { Process } from '../pages/auth/SignUp';

/**
 * 임시 data
 */

export const processList: Process[] = [
  //   {
  //     processId: 1,
  //     title: '약관동의',
  //     instruction: '서비스를 이용하기 위해 약관에 동의 해주세요.',
  //     name: [],
  //     items: {
  //       all: {
  //         required: false,
  //         desc: '모두 동의합니다.',
  //       },
  //       item1: { required: true, desc: '만 14세 이상입니다' },
  //       item2: { required: true, desc: '[필수] 이용 약관 동의' },
  //       item3: { required: false, desc: '[필수] 개인정보 수집 및 이용 동의' },
  //       item4: {
  //         required: false,
  //         desc: '[선택] 광고, 마케팅 활용 정보수신 동의',
  //       },
  //     },
  //     helper: [],
  //     nextButton: '다음',
  //   },
  {
    processId: 2,
    title: '회원가입',
    instruction: '이메일을 입력 해주세요.',
    name: ['이메일'],
    items: {},
    placeholder: ['이메일 주소를 입력 해주세요.'],
    // validButton: '중복 확인',
    helper: {
      error: ['올바른 이메일 형태가 아닙니다.'],
      valid: ['사용 가능한 이메일입니다.'],
    },
    nextButton: '다음',
  },
  {
    processId: 3,
    title: '회원가입',
    instruction: '인증 코드를 입력 해주세요.',
    name: ['이메일 인증 코드'],
    items: {},

    placeholder: ['이메일 인증 코드를 입력 해주세요.'],
    //   validButton: '인증코드 재요청',
    helper: {
      error: ['인증코드가 일치하지 않습니다. 다시 한번 확인 후 입력 해주세요.'],
      valid: ['사용 가능한 이메일입니다.'],
      info: ['인증코드가 오지 않으면 스팸함을 확인 해주세요.'],
    },
    nextButton: '인증 완료',
  },
  {
    processId: 4,
    title: '회원가입',
    instruction: '비밀번호를 입력 해주세요.',
    name: ['비밀번호', '비밀번호 확인'],
    items: {},

    placeholder: [
      '영어, 숫자, 특수문자를 포함한 8~15자리 이내',
      '비밀번호를 한번 더 입력 해주세요.',
    ],
    helper: {
      error: [
        '영어, 숫자, 특수문자를 모두 퐇맣나 8 ~ 15자리 이내로 입력 해주세요.',
        '동일한 비밀번호를 입력 해주세요.',
      ],
      valid: ['사용 가능한 비밀번호입니다.', '동일한 비밀번호입니다.'],
    },
    nextButton: '다음',
  },
  {
    processId: 5,
    title: '회원가입',
    instruction: '닉네임을 입력 해주세요.',
    name: ['닉네임'],
    items: {},

    placeholder: ['영어, 숫자, _, -를 사용한 2 ~ 15자리 이내'],
    //   validButton: '중복 확인',
    helper: {
      error: ['이미 사용 중인 닉네임입니다.'],
      valid: ['사용 가능한 닉네임입니다.'],
    },
    nextButton: '회원가입 완료',
  },
];
