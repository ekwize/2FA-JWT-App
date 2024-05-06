import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
  auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store