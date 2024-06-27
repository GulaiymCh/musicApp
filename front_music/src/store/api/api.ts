import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../config";
import {RootState} from "../configureStore";
import {accessControlTag, albumTag, artistTag, trackHistoryTag, trackTag} from "./tagTypes";

export const api = createApi({
  reducerPath: 'api',
  tagTypes: [accessControlTag, artistTag, albumTag, trackTag, trackHistoryTag],
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.user?.token;

      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),
  endpoints: () => ({})
});