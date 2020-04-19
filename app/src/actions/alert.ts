import { alertConstants } from '../constants/alert';

const success = (message: any) => ({ type: alertConstants.SUCCESS, message });
const error = (message: any) => ({ type: alertConstants.ERROR, message });
const clear = () => ({ type: alertConstants.CLEAR });

export const alertActions = {
  success,
  error,
  clear,
};
