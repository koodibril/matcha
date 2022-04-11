import { getSession } from '../../../shared/neo4j/neo4j'
import { info, internalError } from '../../../shared/utils';
import { createChatRoom, getChatRoom, getUserInfoI } from '../../../shared/neo4j/queries';



export const getChatRoomUser = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    let chatRoom = await getChatRoom({token, username}, session, internalError(res));
    if (!chatRoom[0])
      chatRoom = await createChatRoom({token, username}, session, internalError(res));

    const messages = chatRoom[0].properties.Messages;
    let index = 0;
    if (messages) {
        for (const element of messages) {
          const id = parseInt(element.split('Date:')[0].split('User:')[1]);
          const User = await getUserInfoI({id}, session, internalError(res));
          if (User[0])
            messages[index] = 'User:' + User[0].properties.Username + 'Date:' + element.split('Date:')[1];
          index++;
      }
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