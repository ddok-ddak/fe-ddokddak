import { callAPI } from './common/api';

export interface StatisticsDetail {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
  parentId?: number;
  level: number;
  timeSum: number;
  children?: StatisticsDetail[];
}

export const getTest = async (): Promise<StatisticsDetail[]> => {
  const response = await callAPI({
    url: `/users`,
    method: 'GET',
  });


  return response;
};
