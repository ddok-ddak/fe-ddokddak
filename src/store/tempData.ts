import { MainCategory } from '../pages/category/CategoryPage';

/**
 * 임시 data
 */
export const categories: MainCategory[] = [
  {
    title: '직장',
    color: '#20FFD7',
    id: 0,
    subCategories: [
      { title: '업무', color: '#C2FFF4' },
      { title: '야근', color: '#C2FFF4' },
      { title: '출장', color: '#C2FFF4' },
      { title: '회식', color: '#C2FFF4' },
    ],
  },
  {
    title: '성장',
    color: '#00796b',
    id: 1,
    subCategories: [
      { title: '독서', color: '#b2dfdb' },
      { title: '강의', color: '#b2dfdb' },
      { title: '자격증', color: '#b2dfdb' },
    ],
  },
  {
    title: '관계',
    color: '#f06292',
    id: 2,
    subCategories: [
      { title: '친구', color: '#f8bbd0' },
      { title: '가족', color: '#f8bbd0' },
      { title: '연인', color: '#f8bbd0' },
    ],
  },
  {
    title: '건강',
    color: '#2196f3',
    id: 3,
    subCategories: [
      { title: '잠', color: '#bbdefb' },
      { title: '식사', color: '#bbdefb' },
      { title: '운동', color: '#bbdefb' },
    ],
  },
  {
    title: '낭비',
    color: '#f44336',
    id: 4,
    subCategories: [
      { title: 'SNS', color: '#ffcdd2' },
      { title: '웹서핑', color: '#ffcdd2' },
      { title: '미디어', color: '#ffcdd2' },
      { title: '멍', color: '#ffcdd2' },
    ],
  },
];
