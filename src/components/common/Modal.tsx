import { Box, Button, Divider, Modal as MuiModal } from '@mui/material';
import { useRecoilState } from 'recoil';

import { modalState } from '@/store/modal';

const Modal = () => {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const handleClose = () => setModalInfo({ ...modalInfo, open: false });

  return (
    <MuiModal
      open={modalInfo.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 290,
          height: 153,
          bgcolor: 'background.paper',
          borderRadius: '5px',
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{ 
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'stretch',
            minHeight: 0,
          }}
        >
          <h2 
            id="modal-modal-title"
            style={{ 
              fontSize: '13px', 
              fontWeight: '600', 
              textAlign: 'center', 
              margin: '2em 2.3em 0.6em 2.3em' 
            }}
          >
            {modalInfo.title}
          </h2>
          <p 
            id="modal-modal-description"
            style={{
              fontSize: '12px',
              fontWeight: '400',
              textAlign: 'center',
              margin: '0.4em 2.3em 0.4em 2em'
            }}
          >
            {modalInfo.msg}
          </p>
        </Box>
        <Divider
          orientation='horizontal'
          flexItem
          variant='fullWidth'
          sx={{ flex: '0 0 auto', gridArea: 'divider' }}
          />
        <Box
          sx={{
            gridArea: 'btn-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}
        >
          <Button 
            sx={{ gridArea: 'btn-a', flex: '1 1 49%', color: '#4F75FF' }}
            onClick={modalInfo.btn1ClickHandler}
          >
            {modalInfo.btn1Text}
          </Button>
          <Divider
            orientation='vertical'
            flexItem
            sx={{ gridArea: 'btn-divider', flex: '0 0 auto' }}
          />
          <Button 
            sx={{ gridArea: 'btn-b', flex: '1 1 49%', color: '#4F75FF', fontWeight: '600' }}
            onClick={modalInfo.btn2ClickHandler}
          >
            {modalInfo.btn2Text}
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};

export default Modal;
