import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserApi} from "../../models/Interfaces";

export const userState: IUserApi = {
  email: "",
  password: "",
  displayName: "",
  role: "",
  token: ""
}

export const initialState = {
  user: userState
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, {payload: user}: PayloadAction<IUserApi>) {
      state.user = user;
    },

    logoutUserSuccess(state) {
      state.user = userState;
    },
  }
});

export const {
  loginSuccess,
  logoutUserSuccess
} = userSlice.actions;

export default userSlice;