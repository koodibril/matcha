const LOADING_MATCH_SUCCESS = 'LOADING_MATCH_SUCCESS';
const LOADING_MATCH_FAILURE = 'LOADING_MATCH_FAILURE';
const CLEAR_MATCH = 'CLEAR_MATCH';
const LOGOUT = 'LOGOUT';
const LOADING_CHATROOM_SUCCESS = 'LOADING_CHATROOM_SUCCESS';
const LOADING_CHATROOM_FAILURE = 'LOADING_CHATROOM_FAILURE';
const CLEAR_CHATROOM = 'CLEAR_CHATROOM';

const initialState = '';

export const chat = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action;

  switch (type) {
    case LOADING_MATCH_SUCCESS:
      return { userResult: payload };
      
    case LOADING_MATCH_FAILURE:
        return {};

    case CLEAR_MATCH:
      return {};

    case LOGOUT:
      return {};

    default:
      return state;
  }
}

export const chatRoom = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action;

  switch (type) {
    case LOADING_CHATROOM_SUCCESS:
      return { chatRoom: payload };
      
    case LOADING_CHATROOM_FAILURE:
        return {};

    case CLEAR_CHATROOM:
      return {};

    case LOGOUT:
      return {};

    default:
      return state;
  }
}