import axios, {AxiosResponse} from "axios";
import {apiAccess, baseURL} from "../constants";

type IRes<DATA> = Promise<AxiosResponse<DATA>>

const apiService = axios.create({
    baseURL,
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
    }
});

apiService.interceptors.request.use(req => {
    const access = apiAccess.accessToken;

    if (access) {
        req.headers.Authorization = `Bearer ${apiAccess.accessToken}`
    }

    return req
})

export type {
    IRes
}


export {
    apiService
}