import {useAppSelector} from "./reduxHooks";

export const useCheckLoginUser = () => {
  const user = useAppSelector(state => state.user.user);

  return user?.email !== '' ? user : null;
};