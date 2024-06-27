import {api} from "./api";
import {accessControlTag, trackHistoryTag, trackTag} from "./tagTypes";

export const trackApi = api.injectEndpoints({
  endpoints: build => ({
    getTracks: build.query({
      query: () => `/tracks`,
      providesTags: [accessControlTag, trackTag]
    }),
    getTracksOfAlbum: build.query({
      query: (id) => ({
        url: `/tracks`,
        params: {
          album: id
        }}),
      providesTags: [accessControlTag, trackTag]
    }),
    getUnpublishedTracks: build.query({
      query: () => '/tracks/unPublished',
      providesTags: [accessControlTag, trackTag]
    }),
    createTrack: build.mutation({
      query: (track) => ({
        body: track,
        url: `/tracks`,
        method: 'POST'
      }),
      invalidatesTags: [trackTag]
    }),
    publishTrack: build.mutation({
      query: (id) => ({
        url: `/tracks/${id}/publish`,
        method: 'PUT',
      }),
      invalidatesTags: [trackTag]
    }),
    deleteTrack: build.mutation({
      query: (id) => ({
        url: `/tracks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [trackTag, trackHistoryTag]
    }),
  })
});