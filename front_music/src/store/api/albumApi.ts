import {api} from "./api";

export const albumApi = api.injectEndpoints({
  endpoints: build => ({
    getAlbums: build.query({
      query: () => '/albums'
    }),
    getArtistAlbums: build.query({
      query: (id) => `/albums?artist=${id}`,
    }),
    createAlbum: build.mutation({
      query: (album) => ({
        body: album,
        url: '/album',
        method: 'POST',
      })
    })
  })
});