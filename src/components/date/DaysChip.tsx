import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';

export interface DaysChipProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const DaysChip = (props: DaysChipProps) => {
  const handleClick = useCallback(() => {
    props.onClick();
  }, [props.onClick]);

  return (
    <Box
      sx={{
        padding: '8px',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        textAlign: 'center',
        backgroundColor: `${props.isSelected && '#e3f2fd'}`,
      }}
      onClick={handleClick}
    >
      <Typography>{props.title}</Typography>
    </Box>
  );
};

export default DaysChip;
