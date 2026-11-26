import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

const BASE_URL: string = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (res: AxiosResponse) => {
        return res.data.data;
    },
    (error: AxiosError) => {
        console.log(`Axios Error while making request`, error);

        if (axios.isCancel(error))
            return Promise.reject("UPLOAD_CANCELLED")

        if (!error.response) {
            return Promise.reject("NETWORK_ERROR");
        }

        return Promise.reject(error.response?.data || error);
    }
);


export default api;