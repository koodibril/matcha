import { useMemo } from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

import { SET_MESSAGE, CLEAR_MESSAGE, ERROR_MESSAGE } from "./actions/message";

const initialState = "";

export default function (state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload, error: false };
      
    case ERROR_MESSAGE:
      return { message: payload, error: true };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}

export const getMessage = () =>
  useSelector<RootStateOrAny, any>((state) => state.message);

export const clearMessage = () => ({ type: "CLEAR_MESSAGE" });

export const useMessage = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      clearMessage: () => dispatch(clearMessage()),
    }),
    [dispatch]
  );
};

