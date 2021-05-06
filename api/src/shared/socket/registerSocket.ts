import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getUserInfoT, updateSocket } from '../../shared/neo4j/queries';

export const updateUserSocket = async (token: string, socket: string) => {
  const session = getSession();

  try {
    let userInfo = [];
    let socketId = [];
    if (token && socket) {
        userInfo = await getUserInfoT({ token }, session, internalError);
        if (userInfo[0].properties.Socket !== socket) {
            socketId = await updateSocket({token, socket}, session, internalError);
            info(`socket updated for user`);
        }
    }

    return (socketId);
  } catch (e) {
    return internalError(e);
  } finally {
    await session.close();
  };
}