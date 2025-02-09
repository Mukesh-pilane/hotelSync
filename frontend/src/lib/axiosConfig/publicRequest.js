import axios from 'axios';

export const publicRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})