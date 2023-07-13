import { callAPI } from './common/api';
import CommonResponse from './http';

export const getRecord = async (memberId: number, fromStartedAt: string, toStartedAt: string) => {
    const response = await callAPI({
        url: `/api/v1/activity-records`,
        method: 'GET',
        params: {
            // memberId,
            fromStartedAt,
            toStartedAt,
        },
    });
    return response as CommonResponse;
};

export const addRecord = async (record: {
    name: string;
    startedAt: string;
    finishedAt: string;
}) => {
    const response = await callAPI({
        url: "/api/v1/activity-records",
        method: "POST",
        body: record,
    });
    //console.log(response);
    return response as CommonResponse;
};