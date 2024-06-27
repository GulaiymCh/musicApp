import {api} from "./api";
import {IArtistApi} from "../../models/IArtist";
import {accessControlTag, albumTag, artistTag, trackHistoryTag, trackTag} from "./tagTypes";

export const artistsApi = api.injectEndpoints({
  endpoints: build => ({
    getArtist: build.query<IArtistApi, string>({
      query: (id) => '/artists/' + id
    }),
    getArtists: build.query({
      query: () => '/artists',
      providesTags: [accessControlTag, artistTag]
    }),
    getUnpublishedArtists: build.query({
      query: () => '/artists/unPublished',
      providesTags: [accessControlTag, artistTag]
    }),
    createArtist: build.mutation({
      query: (artist) => ({
        body: artist,
        url: '/artists',
        method: 'POST',
      }),
      invalidatesTags: [artistTag]
    }),
    publishArtist: build.mutation({
      query: (id) => ({
        url: `/artists/${id}/publish`,
        method: 'PUT',
      }),
      invalidatesTags: [artistTag]
    }),
    deleteArtist: build.mutation({
      query: (id) => ({
        url: `/artists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [artistTag, albumTag, trackTag, trackHistoryTag]
    }),
  })
});