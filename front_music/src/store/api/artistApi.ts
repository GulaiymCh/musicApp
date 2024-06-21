import {api} from "./api";

export const  artistsApi = api.injectEndpoints({
  endpoints: build => ({
    getArtists: build.query({
      query: () => '/artists'
    }),
    createArtist: build.mutation({
      query: (artist) => ({
        body: artist,
        url: '/artist',
        method: 'POST'
      })
    })
  })
});