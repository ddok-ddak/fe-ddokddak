import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DefaultIcon from '@/components/common/DefaultIcon';

export interface CircleProps {
  size: number;
  iconSize: number;
  iconName: string;
  color: any;
  fontColor?: string;
  borderColor?: string;
  opacity?: any;
  onClick?: any;
  label?: string;
  labelSize?: string;
  selected?: boolean;
  variant?: 'filled' | 'outlined';
  children?: any;
}

const getIcon = (iconName: string, iconSize: number) => {
  switch (iconName) {
    case '':
      return DefaultIcon(iconSize);
    case 'add':
      return (
        <AddIcon
          sx={{
            color: 'common.white',
            width: iconSize,
            height: iconSize,
          }}
        />
      );
    default:
      return (
        <img
          style={{ width: iconSize, height: iconSize }}
          src={`./images/icons/category/base/${iconName}.png`}
          alt={iconName}
        />
      );
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
    labelSize,
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
          outline: `3px solid ${selected ? borderColor : 'transparent'}`,
          boxShadow: selected ? 'none' : `0 0 0 2px ${color} inset`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {getIcon(iconName, iconSize)}
      </Box>

      {label && (
        <Typography
          variant="subtitle2"
          sx={{
            color: fontColor,
            padding: '8px 0',
            fontSize: labelSize ?? 'auto',
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
};

export default Circle;
