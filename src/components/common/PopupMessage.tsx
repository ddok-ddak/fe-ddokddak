/* eslint-disable import/order */
import { Icon, Typography, Popover, Paper } from '@mui/material';

import Spacer from '@/components/common/Spacer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { theme } from '@/styles';
import { currentPopupMessageType, popupMessageText } from '@/store/common';
import { useEffect, useState } from 'react';
import { popupShowState } from '@/store/popupMessage';
import { DEFAULT_POPUP_MSG_TIMEOUT } from '@/constants/sample';

interface PopoverVirtualElement {
  nodeType: 1;
  getBoundingClientRect: () => DOMRect;
}

const selection = window.getSelection();

const PopupMessage = () => {

  const popupText = useRecoilValue(popupMessageText);
  const popupMessageType = useRecoilValue(currentPopupMessageType);

  const [isPopupShow, setIsPopupShow] = useRecoilState(popupShowState);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { background, icon } = theme.palette.popup;
  
  useEffect(() => {
    
    setTimeout(() => {
      console.log(isPopupShow)
      console.log(popupText)
      console.log(popupMessageType)
      setIsPopupShow(false);
    }, DEFAULT_POPUP_MSG_TIMEOUT);
  }, []);

  return (
    <Popover
      id={isPopupShow ? 'virtual-element-popover' : undefined}
      anchorEl={anchorEl}
      open={isPopupShow}
      onClose={() => {
        setIsPopupShow(false);
      }}
      anchorOrigin={{
        // vertical: 'bottom',
        // horizontal: 'center',
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        // vertical: 'center',
        // horizontal: 'center',
        vertical: 'top',
        horizontal: 'center',

      }}
    >
      <Paper
        onClick={() => setIsPopupShow(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 5vw',
          width: '90vw',
          height: '8vh',
          borderRadius: '15px',
          backgroundColor: background,
        }}
      >
        <>
          <Icon>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="9" r="9" fill={icon} />
              <g clipPath="url(#clip0_1168_926)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.6016 5.67781C13.7372 5.81343 13.8134 5.99735 13.8134 6.18912C13.8134 6.38089 13.7372 6.56481 13.6016 6.70043L8.18091 12.1212C8.10927 12.1928 8.02422 12.2497 7.93062 12.2884C7.83701 12.3272 7.73669 12.3472 7.63536 12.3472C7.53404 12.3472 7.43372 12.3272 7.34011 12.2884C7.24651 12.2497 7.16146 12.1928 7.08982 12.1212L4.39657 9.4284C4.3275 9.36168 4.2724 9.28188 4.2345 9.19365C4.19659 9.10541 4.17664 9.01051 4.17581 8.91448C4.17497 8.81845 4.19327 8.72322 4.22964 8.63434C4.266 8.54546 4.3197 8.46471 4.38761 8.39681C4.45551 8.3289 4.53626 8.2752 4.62514 8.23884C4.71402 8.20248 4.80925 8.18418 4.90528 8.18501C5.00131 8.18585 5.09621 8.2058 5.18444 8.2437C5.27268 8.2816 5.35248 8.3367 5.41919 8.40577L7.63512 10.6217L12.5785 5.67781C12.6457 5.6106 12.7254 5.55729 12.8132 5.52092C12.901 5.48454 12.9951 5.46582 13.0901 5.46582C13.1851 5.46582 13.2792 5.48454 13.367 5.52092C13.4547 5.55729 13.5345 5.6106 13.6016 5.67781Z"
                  fill="#FFFFFF"
                />
              </g>
              <defs>
                <clipPath id="clip0_1168_926">
                  <rect
                    width="11.5714"
                    height="11.5714"
                    fill="white"
                    transform="translate(3.21387 3.21387)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Icon>
          <Spacer x={5} />
          <Typography
            sx={{
              pt: '3px',
              color: 'grey.700',
              lineHeight: '24px',
              fontSize: '13px',
            }}
          >
            {popupText}
          </Typography>
        </>
      </Paper>
    </Popover>
  );
};

export default PopupMessage;
