import { callAPI } from './common/api';
import CommonResponse from './http';

export interface StatisticsDetail {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
  parentId?: number;
  level: number;
  timeSum: number;
  children?: StatisticsDetail[];
}

export interface StatisticsRequest {
  fromStartedAt: string;
  toFinishedAt: string;
}

export const getStatisticsData = async (request: StatisticsRequest) => {
  const response = await callAPI({
    url: `/api/v1/activity-records/stats`,
    method: 'GET',
    params: {
      memberId: 1,
      ...request,
    },
  });

  return response as CommonResponse;
};
