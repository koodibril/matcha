import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { createChatRoom, getChatRoom, getUserInfoT, getUserInfoU } from '../../shared/neo4j/queries';



export const getChatRoomUser = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    const userOne = await getUserInfoT({token}, session) as any;
    const userTwo = await getUserInfoU({username}, session) as any;
    console.log(userOne);
    const userone = userOne.properties.Username;
    const usertwo = userTwo.properties.Username;
    let chatRoom = await getChatRoom({ userone, usertwo }, session);
    if (!chatRoom)
        chatRoom = await createChatRoom({ userone, usertwo}, session);

    info(`chatRoom collected`);
    return res
      .status(200)
      .json({ chatRoom })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}