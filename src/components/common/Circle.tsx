import { Box, Typography } from '@mui/material';
import TestIcon from '@/icons/category/TestIcon';
import { Cleaning, Moving } from '@/images/icons/etc';
import { Movie, Music, Instrument, Game } from '@/images/icons/hobby';

import { Add } from '@/images/icons/common';
import { Excercise, Meal } from '@/images/icons/health';
import { Dating, Family, Friend } from '@/images/icons/relationship';
import { Certificate, Reading } from '@/images/icons/self_dev';
import { Lecture } from '@/images/icons/study';
import { BusinessTrip, CompanyDinner, OverWork, Work } from '@/images/icons/work';
import { Internet, Media, SNS, Wasting } from '@/images/icons/wasting';
import { ReactNode } from 'react';
import { Normal, Student, Worker } from '@/images/icons/mode';

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
  labelSize? : string;
  selected?: boolean;
  variant?: 'filled' | 'outlined';
  children?: any;
}

const categoryIcon = (iconName: string, iconSize: number): ReactNode => {
  switch (iconName) {
    case 'test':
      return TestIcon(iconSize);
      
    // mode
    case 'nomral':
      return Normal(iconSize);
    case 'worker':
      return Worker(iconSize);
    case 'student':
      return Student(iconSize);
            
    // relationship
    case 'family':
      return Family(iconSize);
    case 'friend':
      return Friend(iconSize);
    case 'dating':
      return Dating(iconSize);
    // self-dev
    case 'certificate':
      return Certificate(iconSize);
    case 'reading':
      return Reading(iconSize);   
    // health
    case 'excercise':
      return Excercise(iconSize);
    case 'meal':
      return Meal(iconSize);
    // etc
    case 'cleaning':
      return Cleaning(iconSize);
    case 'moving':
      return Moving(iconSize);
    // hobby
    case 'movie':
      return Movie(iconSize);
    case 'music':
      return Music(iconSize);
    case 'instrument':
      return Instrument(iconSize);
    case 'game':
      return Game(iconSize);
    // study
    case 'lecture':
      return Lecture(iconSize);
    // work
    case 'work':
      return Work(iconSize);
    case 'overwork':
      return OverWork(iconSize);
    case 'businesstrip':
      return BusinessTrip(iconSize);    
    case 'companydinner':
      return CompanyDinner(iconSize);
    // media
    case 'internet':
      return Internet(iconSize);
    // wasting
    case 'sns':
      return SNS(iconSize);
    case 'wasting':
      return Wasting(iconSize);    
    case 'media':
      return Media(iconSize);    
    // add icon
    case 'add':
      return Add(iconSize); 
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
        {categoryIcon(iconName, iconSize)}
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
