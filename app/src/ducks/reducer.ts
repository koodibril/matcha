import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import authentication from './authentication/authentication';
import message from './message/message'
import profile from './profile/profile';
import relationship from './relationship/relationship';
import search from './search/search';
import chat from './chat/chat';
import chatRoom from './chat/chat';

const reducer = (history: History) => combineReducers({
  authentication,
  message,
  profile,
  relationship,
  search,
  chat,
  chatRoom,
  router: connectRouter(history)
});

export default reducer;