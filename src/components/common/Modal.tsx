import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Modal as MuiModal,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useRecoilState } from 'recoil';

import { modalState } from '@/store/modal';
import BottomButton from '@/components/common/BottomButton';
import Spacer from './Spacer';
import { stepButtonProps } from '@/store/common';

const Modal = () => {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const [nextButtonProps, setNextButtonProps] = useRecoilState(stepButtonProps);

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
          minHeight: 153,
          flex: '1 1 auto',
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
              margin: '2em 2.3em 0.6em 2.3em',
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
              margin: '0.4em 2.3em 0.4em 2em',
              whiteSpace: 'pre-line',
            }}
          >
            {modalInfo.msg}
          </p>

          {modalInfo.optionList && (
            <>
              <Spacer y={10} />
              <RadioGroup
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    m: 0,
                    p: 0,
                  }}
                >
                  {modalInfo.optionList?.map((option: any) => {
                    const { id, name, type } = option;
                    return (
                      <FormControlLabel
                        key={id}
                        value={type}
                        label={`${name} 모드`}
                        control={
                          <Radio
                            onChange={() => {
                              setNextButtonProps({
                                ...nextButtonProps,
                                isDisabled: false,
                              });
                            }}
                          />
                        }
                        sx={{
                          color: 'grey.700',
                          m: 0,
                          p: 0,
                          height: '14px',
                          '& .MuiSvgIcon-root ': {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '15px',
                            height: '15px',
                          },
                          '& .MuiSvgIcon-root:first-of-type ': {
                            color: 'grey.700',
                          },
                          '& .MuiSvgIcon-root:last-of-type ': {
                            color: 'pink.700',
                          },
                          ' .MuiFormControlLabel-label': {
                            fontSize: '13px',
                            fontWeiht: '500',
                          },
                        }}
                      />
                    );
                  })}
                </Box>
              </RadioGroup>
            </>
          )}
        </Box>
        {modalInfo.isShowConfirmBtn ? (
          <Container
            sx={{
              mt: 1,
              p: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BottomButton
              btnStyleProps={{ height: '30px !important', margin: '10px 8px' }}
              textStyleProps={{ fontSize: '13px' }}
            />
          </Container>
        ) : (
          <>
            <Divider
              orientation="horizontal"
              flexItem
              variant="fullWidth"
              sx={{ flex: '0 0 auto', gridArea: 'divider' }}
            />
            <Box
              sx={{
                gridArea: 'btn-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <Button
                sx={{
                  gridArea: 'btn-a',
                  flex: '1 1 49%',
                  color: 'button.blue',
                  fontSize: '13px',
                }}
                onClick={modalInfo.btn1ClickHandler}
              >
                {modalInfo.btn1Text}
              </Button>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ gridArea: 'btn-divider', flex: '0 0 auto' }}
              />
              <Button
                sx={{
                  gridArea: 'btn-b',
                  flex: '1 1 49%',
                  color: 'button.blue',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
                onClick={modalInfo.btn2ClickHandler}
              >
                {modalInfo.btn2Text}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </MuiModal>
  );
};

export default Modal;
