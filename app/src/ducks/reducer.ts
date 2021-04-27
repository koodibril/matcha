import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import authentication from './authentication/authentication';
import message from './message/message'
import profile from './profile/profile';
import relationship from './relationship/relationship';
import { search, filter } from './search/search';
import { chat, chatRoom } from './chat/chat';
import notification from './notification/notifications';

const reducer = (history: History) => combineReducers({
  authentication,
  message,
  profile,
  relationship,
  search,
  filter,
  chat,
  chatRoom,
  notification,
  router: connectRouter(history)
});

export default reducer;