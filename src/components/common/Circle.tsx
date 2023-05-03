import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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
    <div
      onClick={props.onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {props.selected ? (
        <div
          style={{
            width: props.size + 'px',
            height: props.size + 'px',
            backgroundColor: props.color,
            borderRadius: '50%',
            border: '3px solid #FF7184',
          }}
        >
          {props.children}
        </div>
      ) : (
        <div
          style={{
            width: props.size + 'px',
            height: props.size + 'px',
            backgroundColor: props.color,
            boxShadow: `0 0 0 2px ${props.color} inset`,
            borderRadius: '50%',
          }}
        >
          {props.children}
        </div>
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
    </div>
  );
};

export default Circle;
