import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { push } from "react-router-redux";

const pushState = (path: string) => push(path);

export const useNavigation = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      pushState: (path: string) => dispatch(pushState(path)),
    }),
    [dispatch]
  );
};

