import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getUser } from '../../modules/user/utils/getUser';
import { updateUser } from '../../modules/user/utils/updateUser';

export const updateUserSocket = async (token: string, socket: string) => {
  const session = getSession();

  try {
    let userInfo = [];
    let socketId = [];
    if (token && socket) {
        userInfo = await getUser(session, { token });
        const online = 0;
        const update = await updateUser(session, { online }, token);
        info(`user ` + userInfo[0].properties.Username + ` is now online ! ` + update[0].properties.Online);
        if (userInfo[0].properties.Socket !== socket) {
            socketId = await updateUser(session, {socket}, token);
            info(`socket updated for user ` + userInfo[0].properties.Username);
        }
    }

    return (socketId);
  } catch (e) {
    return internalError(e);
  } finally {
    await session.close();
  };
}