import { Box, Typography } from '@mui/material';
import TestIcon from '@/icons/category/TestIcon';


export interface CircleProps {
  size: number;
  iconSize: number;
  iconName: string;
  color: any;
  fontColor?: string;
  borderColor?: string;
  onClick?: any;
  label?: string;
  selected?: boolean;
  variant?: 'filled' | 'outlined';
  children?: any;
}

const categoryIcon = (iconName: string, iconSize: number) => {
  switch (iconName) {
    case 'test':
      return TestIcon(iconSize);
    default:
      return TestIcon(iconSize);
  }
};

const Circle = (props: CircleProps) => {
  const {
    size,
    iconSize,
    iconName,
    color,
    fontColor,
    onClick,
    label,
    selected,
    borderColor,
  } = props;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: size + 'px',
          height: size + 'px',
          backgroundColor: color,
          borderRadius: '50%',
          outline: selected ? `3px solid ${borderColor}` : '',
          boxShadow: selected ? 'none' : `0 0 0 2px ${color} inset`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {categoryIcon(iconName, iconSize)}
      </Box>
      {label && (
        <Typography
          variant="subtitle2"
          sx={{
            color: fontColor,
            padding: '8px 0',
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
};

export default Circle;
