import { atom } from 'recoil';

import { SelectedRangeData } from '@/pages/record/CreateRecordPage';


export const selectedTimeRangeState = atom({
  key: 'selectedTimeRangeState',
  default: {
    start: new Date('December 16, 2023 16:00:00'),
    end: new Date('December 16, 2023 18:30:00'),
  } as SelectedRangeData,
});

export const categories = atom<Category[]>({
  key: "categories",
  default: [],
});

export const recoilCategory = atom({
  key: 'recoilCategory',
  default: 1,
});

export const recoilSubCategory = atom({
  key: 'recoilSubCategory',
  default: 1,
});

export const selectedDaysState = atom<number[]>({
  key: 'selectedDaysState',
  default: [],
});

type SubCategory = {
  name: string;
  color: string;
};

type Category = {
  name: string;
  color: string;
  subCategories: SubCategory[];
};

export const categoriesState = atom<Category[]>({
  key: 'categoriesState',
  default: [],
});
