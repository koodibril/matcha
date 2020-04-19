import { userConstants } from '../constants/user';

export const registration = (state: any = {}, action: any) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
}
