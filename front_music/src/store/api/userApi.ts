import {api} from "./api";

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    registerUser: build.mutation({
      query: (user) => ({
        body: user,
        url: '/users',
        method: 'POST'
      })
    })
  })
});