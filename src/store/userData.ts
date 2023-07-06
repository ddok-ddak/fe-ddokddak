import { atom } from 'recoil';

export interface UserData {
    email: string,
    password: string,
    nickname: string,
}

export const userDataTypeState = atom({
    key: 'userDataType',
    default: {
        email: '',
        password: '',
        nickname: '',
    } as UserData,
});