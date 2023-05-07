import { SubCategory } from '../pages/category/CategoryPage';
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
    params: {
      // memberId: 1,
    },
  });

  return response as CommonResponse;
};

export const addSubCategory = async (request: SubCategory) => {
  const response = await callAPI({
    url: `/api/v1/categories`,
    method: 'POST',
    body: {
      name: request.name,
      color: request.color,
      level: 1,
      mainCategoryId: request.mainCategoryId,
      // memberId: 1,
    },
  });

  return response as CommonResponse;
};

export const updateSubCategory = async (request: SubCategory) => {
  const response = await callAPI({
    url: `/api/v1/categories/value`,
    method: 'PUT',
    body: {
      categoryId: request.categoryId,
      name: request.name,
      color: request.color,
    },
    // params: {
    //   memberId: 1,
    // },
  });

  return response as CommonResponse;
};

export const deleteCategory = async (categoryId: number) => {
  const response = await callAPI({
    url: `/api/v1/categories/${categoryId}`,
    method: 'DELETE',
    // body: {
    //   memberId: 1,
    // },
  });

  return response as CommonResponse;
};
