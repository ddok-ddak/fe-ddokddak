import { Box, Typography } from '@mui/material';

export interface DaysChipProps {
  title: string;
  isselected: boolean;
  onClick: () => void;
  underline: boolean;
  color?: string;
}

const DaysChip = (props: DaysChipProps) => {
  const color = props.color
    ? props.color
    : `${props.isselected ? 'inherit' : 'text.primary'}`;
  const fontWeight = props.underline ? '700' : '400';
  return (
    <Box
      onClick={props.onClick}
      sx={{
        display: 'flex',
        flex: '0 0 11vw',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 'inherit',
        }}
      >
        <Box
          sx={{
            backgroundColor: `${props.isselected && 'pink.200'}`,
            borderRadius: '50%',
            flexDirection: 'column',
            width: '6vw',
            flex: '0 0 6vw',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              color,
              fontWeight,
            }}
          >
            {props.title}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: `${props.underline && 'pink.700'}`,
          width: '100%',
          height: '5px',
          borderRadius: '5px',
        }}
      />
    </Box>
  );
};

export default DaysChip;
