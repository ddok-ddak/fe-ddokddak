import { MainCategory } from '../pages/category/CategoryPage';

/**
 * 임시 data
 */
export const categories: MainCategory[] = [
  {
    title: '직장',
    color: '#20FFD7',
    subCategories: [
      { title: '업무', color: '#C2FFF4' },
      { title: '야근', color: '#C2FFF4' },
      { title: '출장', color: '#C2FFF4' },
      { title: '회식', color: '#C2FFF4' },
    ],
  },
  {
    title: '성장',
    color: '#20FFD7',
    subCategories: [
      { title: '독서', color: '#C2FFF4' },
      { title: '강의', color: '#C2FFF4' },
      { title: '자격증', color: '#C2FFF4' },
    ],
  },
  {
    title: '관계',
    color: '#20FFD7',
    subCategories: [
      { title: '친구', color: '#C2FFF4' },
      { title: '가족', color: '#C2FFF4' },
      { title: '연인', color: '#C2FFF4' },
    ],
  },
  {
    title: '건강',
    color: '#20FFD7',
    subCategories: [
      { title: '잠', color: '#C2FFF4' },
      { title: '식사', color: '#C2FFF4' },
      { title: '운동', color: '#C2FFF4' },
    ],
  },
  {
    title: '낭비',
    color: '#20FFD7',
    subCategories: [
      { title: 'SNS', color: '#C2FFF4' },
      { title: '웹서핑', color: '#C2FFF4' },
      { title: '미디어', color: '#C2FFF4' },
      { title: '멍', color: '#C2FFF4' },
    ],
  },
];
