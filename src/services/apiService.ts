import axios, {AxiosResponse} from "axios";
import {apiAccess, baseURL} from "../constants";

type IRes<DATA> = Promise<AxiosResponse<DATA>>

const apiService = axios.create({
    baseURL,
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${apiAccess.accessToken}`
    }
});

export type {
    IRes
}


export {
    apiService
}