import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserApi} from "../../models/Interfaces";
import {toast} from "react-toastify";

export const initialState: IUserApi = {
  _id: "",
  email: "",
  password: "",
  displayName: "",
  role: "",
  token: ""
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, {payload: user}: PayloadAction<IUserApi>) {
      Object.assign(state, user);
      toast.success('Login success');
    },

    logoutUserSuccess(state) {
      Object.assign(state, initialState);
      toast.info('Logout');
    },
  }
});

export const {
  loginSuccess,
  logoutUserSuccess
} = userSlice.actions;

export default userSlice;