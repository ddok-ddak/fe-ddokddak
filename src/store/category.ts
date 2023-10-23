import { atom } from 'recoil';
import { SubCategoryProps } from '../pages/category/CategoryPage';

export const selectedSubCategoryState = atom({
  key: 'selectedSubCategoryState',
  default: {} as SubCategoryProps,
});
