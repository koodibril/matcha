import { userConstants } from '../constants/user';

export const users = (state: any = {}, action: any) => {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return { loading: true };
    case userConstants.GETALL_SUCCESS:
      return { items: action.users };
    case userConstants.GETALL_FAILURE:
      return { error: action.error };
    case userConstants.DELETE_REQUEST:
      return { ...state, items: state.items.map((user: any) => user.id === action.id ? { ...user, deleting: true } : user) };
    case userConstants.DELETE_SUCCESS:
      // Remove deleted user from state
      return { items: state.items.filter((user: any) => user.id !== action.id) };
    case userConstants.DELETE_FAILURE:
      // Remove 'deleting: true' property and add 'deleteError: [error]' property to user
      return {
        ...state,
        items: state.items.map((user: any) => {
          if (user.id === action.id) {
            // Make copy of user without 'deleting: true' property
            const { deleting, ...userCopy } = user;

            // Return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state;
  };
};
