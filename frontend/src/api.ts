import axios, { AxiosError, AxiosResponse } from "axios"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"
import { IAccessToken, IRefreshToken } from "./types/TokenTypes"


const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true
})


api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error: AxiosError) => {
        Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 401 && 
            !originalRequest._retry && 
            error.config.url !== "/login/refresh/" && 
            error.config.url !== "/login/"
        ) {
            originalRequest._retry = true
    
            const refresh = localStorage.getItem(REFRESH_TOKEN)
            const data: IRefreshToken = { refresh: refresh }
            const response = await api.post("/token/refresh/", data)

            const { access }: IAccessToken = response.data.access
            localStorage.setItem(ACCESS_TOKEN, access)
    
            originalRequest.headers.Authorization = `Bearer ${access}`
            return api(originalRequest)
        }
        return Promise.reject(error)
    }
)


export default api