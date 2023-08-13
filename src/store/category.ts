import { atom } from 'recoil';
import { MainCategoryProps, SubCategoryProps } from '../pages/category/CategoryPage';

// selected Main Category
export const selectedMainCategoryState = atom({
  key: 'SelectedCategoryState',
  default: {} as MainCategoryProps,
});

// selected Sub Category
export const selectedSubCategoryState = atom({
  key: 'SelectedSubCategoryState',
  default: {} as SubCategoryProps,
});