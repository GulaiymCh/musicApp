import {api} from "./api";
import {accessControlTag, trackHistoryTag} from "./tagTypes";

export const trackHistoryApi = api.injectEndpoints({
  endpoints: build => ({
    getTrackHistory: build.query({
      query: () => `/track_history`,
      providesTags: [accessControlTag, trackHistoryTag]
    }),
    writeInTrackHistory: build.mutation({
      query: (id) => ({
        url: `/track_history/secret`,
        method: 'POST',
        body: {
          track: id
        }
      }),
    })
  })
});