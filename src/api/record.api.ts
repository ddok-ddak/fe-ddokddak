import { SubCategory } from '../pages/category/CategoryPage';
import { callAPI } from './common/api';
import CommonResponse from './http';

interface ActivityRecord {
  memberId: number;
  categoryName: string;
  categoryId: number;
  startedAt: string;
  finishedAt: string;
}

export const getRecord = async (memberId: number, fromStartedAt: string, toStartedAt: string): Promise<ActivityRecordResponse> => {
    const response = await callAPI({
        url: `/api/v1/activity-records`,
        method: 'GET',
        params: {
            memberId,
            fromStartedAt,
            toStartedAt,
        },
    });
    console.log(response);
    return response as CommonResponse;
};