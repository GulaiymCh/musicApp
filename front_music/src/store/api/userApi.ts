import {api} from "./api";
import {IUserApi, IUserLogin, IUserRegister} from "../../models/Interfaces";

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    registerUser: build.mutation<IUserApi, IUserRegister>({
      query: (user: IUserRegister) => ({
        body: user,
        url: '/users',
        method: 'POST'
      })
    }),
    loginUser: build.mutation<IUserApi, IUserLogin>({
      query: (user: IUserLogin) => ({
        body: user,
        url: 'users/sessions',
        method: 'POST'
      })
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: 'users/sessions',
        method: 'DELETE'
      })
    })
  })
});