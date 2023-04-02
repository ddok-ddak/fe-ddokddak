import { MainCategory } from '../pages/category/CategoryPage';

/**
 * 임시 data
 */
export const categories: MainCategory[] = [
  {
    name: '직장',
    color: '#20FFD7',
    categoryId: 0,
    subCategories: [
      { name: '업무', color: '#C2FFF4' },
      { name: '야근', color: '#C2FFF4' },
      { name: '출장', color: '#C2FFF4' },
      { name: '회식', color: '#C2FFF4' },
    ],
  },
  {
    name: '성장',
    color: '#00796b',
    categoryId: 1,
    subCategories: [
      { name: '독서', color: '#b2dfdb' },
      { name: '강의', color: '#b2dfdb' },
      { name: '자격증', color: '#b2dfdb' },
    ],
  },
  {
    name: '관계',
    color: '#f06292',
    categoryId: 2,
    subCategories: [
      { name: '친구', color: '#f8bbd0' },
      { name: '가족', color: '#f8bbd0' },
      { name: '연인', color: '#f8bbd0' },
    ],
  },
  {
    name: '건강',
    color: '#2196f3',
    categoryId: 3,
    subCategories: [
      { name: '잠', color: '#bbdefb' },
      { name: '식사', color: '#bbdefb' },
      { name: '운동', color: '#bbdefb' },
    ],
  },
  {
    name: '낭비',
    color: '#f44336',
    categoryId: 4,
    subCategories: [
      { name: 'SNS', color: '#ffcdd2' },
      { name: '웹서핑', color: '#ffcdd2' },
      { name: '미디어', color: '#ffcdd2' },
      { name: '멍', color: '#ffcdd2' },
    ],
  },
];
