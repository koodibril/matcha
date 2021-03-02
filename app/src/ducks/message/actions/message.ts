export const SET_MESSAGE = "SET_MESSAGE";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const setMessage = (message: string) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});