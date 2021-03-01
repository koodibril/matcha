import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/configure";

import { SET_MESSAGE, CLEAR_MESSAGE } from "./actions/message";

const initialState = "";

export interface MessageType {
  message?: string;
}

export default function (state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}

export const clearMessage = () => ({ type: "CLEAR_MESSAGE" });

export const useMessage = () =>
  useSelector((state: RootState) => state.message);
export const useMessageActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      clearMessage: () => dispatch(clearMessage()),
    }),
    [dispatch]
  );
};
