import { applyMiddleware, createStore } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import reducer from "src/ducks/reducer";
import { MessageType } from "src/ducks/message/message";
import { AuthenticationType } from "src/ducks/authentication/authentication";
import { ProfileType } from "src/ducks/profile/profile";
import { NotificationType } from "src/ducks/notification/notifications";
import { RelationshipType } from "src/ducks/relationship/relationship";
import { SearchType } from "src/ducks/search/search";
import { ChatRoomType, ChatType } from "src/ducks/chat/chat";

export const history = createBrowserHistory();

const composeEnhancers = (f: any) => f;

export interface RootState {
  message: MessageType;
  authentication: AuthenticationType;
  profile: ProfileType;
  relationship: RelationshipType;
  search: SearchType;
  chat: ChatType;
  chatRoom: ChatRoomType;
  notification: NotificationType;
}

const configure = () =>
  createStore(
    reducer(history),
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );

export default configure;

