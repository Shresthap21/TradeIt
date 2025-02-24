import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_SERVICE;


export const axiosPublic = axios.create({
    baseURL: baseURL
});