import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { createChatRoom, getChatRoom } from '../../shared/neo4j/queries';



export const getChatRoomUser = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    let chatRoom = await getChatRoom({token, username}, session, internalError(res)) as any;
    if (!chatRoom)
      chatRoom = await createChatRoom({token, username}, session, internalError(res)) as any;

    const messages = chatRoom.properties.Messages;

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