import { callAPI } from './common/api';
import CommonResponse from './http';

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
export const addRecord = async (record: {
    name: string;
    startedAt: string;
    finishedAt: string;
}) => {
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
export const updateRecord = async (record: {
    id: number;
    name: string;
    // startedAt: string;
    // finishedAt: string;
    // TODO: category parameter!
}) => {
    const response = await callAPI({
        url: `/api/v1/activity-records`,
        method: 'PUT',
        body: record,
    });
    return response as CommonResponse;
};

/**
 * delete record
 * @param id
 * @returns response
 */
export const deleteRecord = async ( id: number ) => {
    const response = await callAPI({
        url: `/api/v1/activity-records`,
        method: 'DELETE',
        body: {id},
    });
    return response as CommonResponse;
};