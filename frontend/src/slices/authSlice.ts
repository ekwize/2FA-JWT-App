import { createSlice } from "@reduxjs/toolkit"
import { IUid } from "../types/AuthTypes"
import { ITokens } from "../types/TokenTypes"
import { IUserView } from "../types/UserTypes"
import { login, signup, logout, getUser, verify, activate } from "../actions/actions"


interface ErrorState {
    message?: string 
    field?: any
}

type AuthApiState = {
    uid: IUid | null
    user: IUserView | null
    token: ITokens | null
    status: "idle" | "loading" | "success" | "fail"
    error: ErrorState | null
}

const initialState: AuthApiState = {
    uid: null,
    user: null,
    token: null,
    status: "idle",
    error: null,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => { builder
        .addCase(signup.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(
            signup.fulfilled, (state, action) => {
            state.status = "success"
            state.uid = action.payload
            }
        )
        .addCase(signup.rejected, (state, action) => {
            state.status = "fail"
            state.error = {
                message: action.error.message,
                field: action.payload
            }
        })


        .addCase(login.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = "success"
            state.token = action.payload
            }
        )
        .addCase(login.rejected, (state, action) => {
            state.status = "fail"
            state.error = {
                message: action.error.message
            }
        })


        .addCase(logout.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.status = "success"
            state.user = null
            state.token = null
        })
        .addCase(logout.rejected, (state, action) => {
            state.status = "fail"
            state.error = {
                message: action.error.message
            } 
        })


        .addCase(getUser.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.status = "success"
            state.user = action.payload
        })
        .addCase(getUser.rejected, (state, action) => {
            state.status = "fail"
            state.error = {
                message: action.error.message 
            }
        })

        .addCase(verify.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(verify.fulfilled, (state) => {
            state.status = "success"
            state.error = null
            state.uid = null
        })
        .addCase(verify.rejected, (state, action) => {
            state.status = "fail"
            state.error = {
                message: action.error.message
            } 
        })

        .addCase(activate.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(activate.fulfilled, (state) => {
            state.status = "success"
            state.error = null
        })
        .addCase(activate.rejected, (state, action) => {
            state.status = "fail"
            state.error = {
                message: action.error.message
            } 
        })
    }
})


export default authSlice.reducer