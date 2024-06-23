import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../config";
import {RootState} from "../configureStore";

export const api = createApi({
  reducerPath: 'api',
  tagTypes: [''],
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.user?.user?.token;

      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),
  endpoints: () => ({})
});