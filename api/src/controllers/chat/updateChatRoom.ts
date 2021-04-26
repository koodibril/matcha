import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getChatRoom, getUserInfoT, updateChatRoom } from '../../shared/neo4j/queries';
import { addNotifications, NOTIFICATION_MESSAGE } from '../notification/addNotification';



export const updateChatRoomUser = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;
  const message = req.body.message;

  try {
    let chatRoom = await getChatRoom({token, username}, session, internalError(res));
    const userOne = await getUserInfoT({token}, session, internalError(res));
    let messages = chatRoom[0].properties.Messages ? chatRoom[0].properties.Messages : [];

    const newMessage = "User:" + userOne[0].identity + "Date:" + Date.now() + "Message:" + message;
    messages.push(newMessage);
    chatRoom = await updateChatRoom({token, username, messages}, session, internalError(res));
    addNotifications(token, username, NOTIFICATION_MESSAGE);

    info(`chatRoom collected`);
    return res
      .status(200)
      .json({ messages })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}