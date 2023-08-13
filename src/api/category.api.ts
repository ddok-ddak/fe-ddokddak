import { SubCategoryProps } from '../pages/category/CategoryPage';
import { callAPI } from './common/api';
import CommonResponse from './http';

interface User {
  userId: string;
  firstname: string;
  lastname: string;
  friends: { id: string }[];
}

export interface UsersResponse {
  users: User[];
  total: string;
}

export const getCategories = async () => {
  const response = await callAPI({
    url: `/api/v1/categories`,
    method: 'GET',
  });
  return response as CommonResponse;
};

export const addSubCategory = async (request: any) => {
  const response = await callAPI({
    url: `/api/v1/categories`,
    method: 'POST',
    body: {
      name: request.name,
      color: request.color,
      highlightColor: request.highlightColor,
      iconId: request.iconId,
      mainCategoryId: request.mainCategoryId,
      level: 1, // Main Category : 0, Sub Category: 1
    },
  });

  return response as CommonResponse;
};

export const updateSubCategory = async (request: any) => {
  const response = await callAPI({
    url: `/api/v1/categories/value`,
    method: 'PUT',
    body: {
      categoryId: request.categoryId,
      name: request.name,
      iconId: request.iconId,
    },
  });
  return response as CommonResponse;
};

export const deleteCategory = async (categoryId: number) => {
  const response = await callAPI({
    url: `/api/v1/categories/${categoryId}`,
    method: 'DELETE',
  });

  return response as CommonResponse;
};
