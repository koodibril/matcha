import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { addNotifications, NOTIFICATION_MESSAGE } from '../../notifications/handlers/addNotification';
import { getSocketIo } from '../../../server';
import { getUser } from '../../user/utils/getUser';
import { updateChatRoom } from '../utils/updateChatRoom';
import { getUserWithId } from '../../user/utils/getUserWithId';
import { getChatRoom } from '../utils/getChatRoom';



export const updateChatRoomUser = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;
  const message = req.body.message;

  try {
    let chatRoom = await getChatRoom(session, token, username);
    if (!chatRoom[0]) return conflict(res, "Chatroom doesn't exist");
    const userOne = await getUser(session, {token});
    const userTwo = await getUser(session, {username});
    let messages = chatRoom[0].properties.Messages ? chatRoom[0].properties.Messages : [];

    const newMessage = "User:" + userOne[0].identity + "Date:" + Date.now() + "Message:" + message;
    messages.push(newMessage);
    chatRoom = await updateChatRoom(session, {messages}, token, username);
    await addNotifications(session, token, username, NOTIFICATION_MESSAGE);
    const io = getSocketIo();
    io.to(userOne[0].properties.Socket).emit('newmessage', null);
    io.to(userTwo[0].properties.Socket).emit('newmessage', null);
    
    messages = chatRoom[0].properties.Messages;
    let index = 0;
    for (const element of messages) {
      const id = parseInt(element.split('Date:')[0].split('User:')[1]);
      const User = await getUserWithId(session, id);
      if (User[0])
        messages[index] = 'User:' + User[0].properties.Username + 'Date:' + element.split('Date:')[1];
      index++;
    }

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