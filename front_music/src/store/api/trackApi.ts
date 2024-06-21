import {api} from "./api";

export const trackApi = api.injectEndpoints({
  endpoints: build => ({
    getTracks: build.query({
      query: (id) => '/tracks?album=' + id
    })
  })
});