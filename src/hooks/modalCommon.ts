import { modalState } from '@/store/modal';
import { useRecoilState } from 'recoil';

export function useModalCommon() {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  function showServerError() {
    setModalInfo({
      ...modalInfo,
      title: '서버 오류',
      msg: '오류가 발생했습니다. 다시 시도 해주세요.',
      open: true,
      isShowConfirmBtn: true,
    });
  }

  function closeModal() {
    setModalInfo({
      ...modalInfo,
      open: false,
    });
  }

  return {
    showServerError,
    closeModal,
  };
}
