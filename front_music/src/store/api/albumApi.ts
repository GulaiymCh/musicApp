import {api} from "./api";
import {IAlbumApi} from "../../models/IAlbum";
import {accessControlTag, albumTag, trackHistoryTag, trackTag} from "./tagTypes";

export const albumApi = api.injectEndpoints({
  endpoints: build => ({
    getAlbum: build.query<IAlbumApi, string>({
      query: (id) => '/albums/' + id
    }),
    getAlbums: build.query({
      query: () => '/albums',
      providesTags: [accessControlTag, albumTag]
    }),
    getArtistAlbums: build.query({
      query: (id) => ({
        url: `/albums`,
        params: {
          artist: id
        }
      }),
      providesTags: [accessControlTag, albumTag]
    }),
    getUnpublishedAlbums: build.query({
      query: () => '/albums/unPublished',
      providesTags: [accessControlTag, albumTag]
    }),
    createAlbum: build.mutation({
      query: (album) => ({
        body: album,
        url: '/albums',
        method: 'POST'
      }),
      invalidatesTags: [albumTag]
    }),
    publishAlbum: build.mutation({
      query: (id) => ({
        url: `/albums/${id}/publish`,
        method: 'PUT',
      }),
      invalidatesTags: [albumTag]
    }),
    deleteAlbum: build.mutation({
      query: (id) => ({
        url: `/albums/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [albumTag, trackTag, trackHistoryTag]
    }),
  })
});