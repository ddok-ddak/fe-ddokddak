import { TextField, InputAdornment, IconButton, Box } from '@mui/material';

const DateInput = ({ params, width }: any) => {
  return (
    <TextField
      {...params}
      helperText={null}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ m: 0 }}>
            <IconButton>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.52941 0H4.41176V1.76471H10.5882V0H11.4706V1.76471H14H15V2.76471V13.1176V14.1176H14H1H0V13.1176V2.76471V1.76471H1H3.52941V0ZM10.5882 2.76471V3.52941H11.4706V2.76471H14V6.17647H1V2.76471H3.52941V3.52941H4.41176V2.76471H10.5882ZM1 7.05882V13.1176H14V7.05882H1Z"
                  fill="#4B4B4B"
                />
              </svg>
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        display: 'flex',
        ' .MuiInputBase-root': { justifyContent: 'center', p: 0 },
        ' .MuiInputBase-input': {
          p: '16px 0',
          flex: '1 1 auto',
          overflow: 'auto',
          color: '#4B4B4B',
          fontWeight: '600',
          fontSize: '14px',
          width: width + 'px',
        },
        ' .MuiInputAdornment-root': { flex: '0 0 auto', pb: '1px' },
        '& input': { pl: 0 },
        '& fieldset': { border: 'none' },
      }}
    />
  );
};

export default DateInput;
