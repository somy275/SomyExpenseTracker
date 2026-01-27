import axios from "axios"
import { API_PATH } from "../../utils/apiPath"
import { axiosInstance } from "../../utils/axoisInstance"

export const logout = async () => {
    await axiosInstance.get(API_PATH.AUTH.LOGOUT, {
        withCredentials: true
    })
    window.location.href = "/login";
}