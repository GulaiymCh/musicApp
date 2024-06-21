import {combineReducers} from "redux";
import {api} from "./api/api";
import {configureStore} from "@reduxjs/toolkit";

const reducers = combineReducers({
  [api.reducerPath]: api.reducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})