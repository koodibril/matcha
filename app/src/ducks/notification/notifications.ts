const LOADING_NOTIFICATION_SUCCESS = 'LOADING_NOTIFICATION_SUCCESS';
const LOADING_NOTIFICATION_FAILURE = 'LOADING_NOTIFICATION_FAILURE';
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
const LOGOUT = 'LOGOUT';

const initialState = '';

export interface NotificationType {
  notifications?: any;
}

const notification = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action;

  switch (type) {
    case LOADING_NOTIFICATION_SUCCESS:
      return { notifications: payload };
      
    case LOADING_NOTIFICATION_FAILURE:
        return {};

    case CLEAR_NOTIFICATION:
      return {};

    case LOGOUT:
      return {};

    default:
      return state;
  }
}

export default notification;