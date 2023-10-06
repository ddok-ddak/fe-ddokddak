import { Box, Typography } from '@mui/material';

export interface CircleProps {
  size: number;
  color: any;
  onClick?: any;
  label?: string;
  selected?: boolean;
  variant?: 'filled' | 'outlined';
  children?: any;
}

const Circle = (props: CircleProps) => {
  return (
    <Box
      onClick={props.onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {props.selected ? (
        <Box
          sx={{
            width: props.size + 'px',
            height: props.size + 'px',
            backgroundColor: props.color,
            borderRadius: '50%',
            border: '3px solid primary.main',
          }}
        >
          {props.children}
        </Box>
      ) : (
        <Box
          sx={{
            width: props.size + 'px',
            height: props.size + 'px',
            backgroundColor: props.color,
            boxShadow: `0 0 0 2px ${props.color} inset`,
            borderRadius: '50%',
          }}
        >
          {props.children}
        </Box>
      )}
      {props.label && (
        <Typography
          variant="subtitle2"
          sx={{
            padding: '8px 0',
          }}
        >
          {props.label}
        </Typography>
      )}
    </Box>
  );
};

export default Circle;
