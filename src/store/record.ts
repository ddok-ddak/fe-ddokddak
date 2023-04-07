import { atom } from 'recoil';
// import { atom, selector } from 'recoil';

import { SelectedRangeData } from '@/pages/record/CreateRecordPage';


export const selectedTimeRangeState = atom({
  key: 'selectedTimeRangeState',
  default: {} as SelectedRangeData,
});

export const categories = atom<Category[]>({
  key: "categories",
  default: [],
});

export const recoilCategory = atom({
  key: 'recoilCategory',
  default: 0,
});

export const recoilSubCategory = atom({
  key: 'recoilSubCategory',
  default: 0,
});

export const selectedDaysState = atom<number[]>({
  key: 'selectedDaysState',
  default: [],
});

type SubCategory = {
  title: string;
  color: string;
};

type Category = {
  title: string;
  color: string;
  subCategories: SubCategory[];
};

export const categoriesState = atom<Category[]>({
  key: 'categoriesState',
  default: [],
});