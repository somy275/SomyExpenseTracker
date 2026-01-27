import axios from "axios";
import { BASE_URL } from "./apiPath.js"
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 6000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    withCredentials: true
})
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (!error.response) {
            console.error("Network error or no response:", error);
            return Promise.reject(error);
        }
        const message = error.response.data?.message;
        const currentPath = window.location.pathname;


        if (message === "No refresh token") {
            // Only redirect if we're NOT on a public route like login
            if (!["/login", "/signup"].includes(currentPath)) {
                window.location.href = "/login";
            }

            return Promise.reject(error); // prevent infinite logs, reject only once
        }

        if (error.response?.status === 401 && !originalRequest._retry || message === "Not authenticated") {
            originalRequest._retry = true;
            try {
                await axiosInstance.post("/api/v1/auth/refresh-token"); // refresh cookie
                return axiosInstance(originalRequest); // retry original
            } catch (refreshError) {
                if (!["/login", "/signup"].includes(currentPath)) {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }


)