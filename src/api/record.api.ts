import { callAPI } from './common/api';
import CommonResponse from './http';

// interface for record
export interface IRecord {
  id?: number;
  categoryId: number;
  startedAt: string;
  finishedAt: string;
  content: string;
  timeUnit?: number;
}

/**
 * get all record
 * @param fromStartedAt start time
 * @param toStartedAt end time
 * @returns response
 */
export const getRecord = async (fromStartedAt: string, toStartedAt: string) => {
  const response = await callAPI({
    url: `/api/v1/activity-records`,
    method: 'GET',
    params: {
      fromStartedAt,
      toStartedAt,
    },
  });
  return response as CommonResponse;
};

/**
 * add record
 * @param record
 * @returns response
 */
export const addRecord = async (record: any) => {
  const response = await callAPI({
    url: `/api/v1/activity-records`,
    method: 'POST',
    body: record,
  });
  return response as CommonResponse;
};

/**
 * update record
 * @param record
 * @returns response
 */
export const updateRecord = async (record: IRecord) => {
  const response = await callAPI({
    url: `/api/v1/activity-records`,
    method: 'PUT',
    body: record
  });
  return response as CommonResponse;
};

/**
 * delete record
 * @param id
 * @returns response
 */
export const deleteRecord = async (id: number) => {
  const response = await callAPI({
    url: `/api/v1/activity-records/${id}`,
    method: 'DELETE'
  });
  return response as CommonResponse;
};
