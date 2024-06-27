import {useAppSelector} from "./reduxHooks";
import {IUserApi} from "../../models/Interfaces";

export const useCheckLoginUser = () => {
  const user: IUserApi = useAppSelector(state => state.user);

  return user?.email !== '' ? user : null;
};