import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {api} from "./api/api";
import userSlice from "./slices/userSlice";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  [api.reducerPath]: api.reducer
});

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: true,
  preloadedState: persistedState
});

store.subscribe(() => {
  saveToLocalStorage({
    user: store.getState().user
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;