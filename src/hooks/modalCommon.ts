import { modalState } from '@/store/modal';
import { useRecoilState, useResetRecoilState } from 'recoil';

export function useModalCommon() {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const resetModalInfo = useResetRecoilState(modalState);

  /**
   * show server error message
   */
  function showServerError() {
    setModalInfo({
      ...modalInfo,
      title: '서버 오류',
      msg: '오류가 발생했습니다. 다시 시도 해주세요.',
      open: true,
      isShowConfirmBtn: true,
    });
  }

  /**
   * close modal by resetting recoil state
   * @param event click / touch event
   * @param reason event type
   * @returns 
   */
  function closeModal(event: any, reason: any) {
    // prevent from closing by back drop click 
    if (reason && reason === 'backdropClick') {
      return true;
    }
    resetModalInfo();
  }

  return {
    showServerError,
    closeModal,
  };
}
