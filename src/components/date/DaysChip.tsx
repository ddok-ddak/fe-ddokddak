import { Box, Typography } from '@mui/material';

export interface DaysChipProps {
  title: string;
  isselected: boolean;
  onClick: () => void;
  underline: boolean;
}

const DaysChip = (props: DaysChipProps) => {
  return (
    <Box
  sx={{
    padding: '8px',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    textAlign: 'center',
    backgroundColor: `${props.isselected && '#FFDCE1'}`,
    textDecoration: `${props.underline && 'underline #FF7184 4px'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  onClick={props.onClick}
>
  <Typography
    sx={{
      color: `${props.isselected ? 'inherit' : 'text.primary'}`,
    }}
  >
    {props.title}
  </Typography>
</Box>
  );
};

export default DaysChip;
