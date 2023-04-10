import { atom } from 'recoil';
import { SubCategory } from '../pages/category/CategoryPage';

export const selectedSubCategoryState = atom({
  key: 'selectedSubCategoryState',
  default: {} as SubCategory,
});
