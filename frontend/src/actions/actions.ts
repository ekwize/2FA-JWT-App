import api from "../api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ILogin, ISignup } from "../types/AuthTypes"
import { IActivate, IUid } from "../types/AuthTypes"
import { ITokens } from "../types/TokenTypes"
import { IUserView } from "../types/UserTypes"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { jwtDecode } from "jwt-decode"


export const signup = createAsyncThunk<IUid, ISignup>("signup", async (data, thunkAPI) => {
    try {
        const response = await api.post<IUid>("/signup/", data)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }

})


export const login = createAsyncThunk<ITokens, ILogin>("login", async (data) => {
    const response = await api.post<ITokens>("/login/", data)
    const { access, refresh }: ITokens = response.data
    
    localStorage.setItem(ACCESS_TOKEN, access)
    localStorage.setItem(REFRESH_TOKEN, refresh)
    
    return response.data
    
})


export const logout = createAsyncThunk<void, void>("logout", async () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
})


export const getUser = createAsyncThunk<IUserView, void>("user", async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    
    if (!token) {
        throw new Error("Token not found")
    }
    
    const decoded = jwtDecode<{user_id: string}>(token)
    const uid = decoded.user_id
    if (!uid) {
        throw new Error("Uid not found")
    }
    const user = await api.get<IUserView>(`/user/${uid}/`)
    return user.data
})


export const verify = createAsyncThunk<void, IUid | null>("verification", async (data) => {
    await api.post(`/verification/`, data)
})


export const activate = createAsyncThunk<void, IActivate>("activation", async (data) => {
    await api.post(`/activation/${data.uidb64}/${data.token}/`)
})