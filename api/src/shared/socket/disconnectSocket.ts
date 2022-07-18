import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getUser } from '../../modules/user/utils/getUser';
import { updateUser } from '../../modules/user/utils/updateUser';

export const disconnectSocket = async (socket: string) => {
  const session = getSession();

  try {
      const online = Date.now();
      const user = await getUser(session, { socket }, internalError);
      const token = user[0].properties.Token;
      const update = await updateUser(session, { online }, token, internalError);
      info(`socket ` + socket + ` destroyed for user ` + update[0].properties.Username + ` last connection on: ` + update[0].properties.Online);

    return (socket);
  } catch (e) {
    return internalError(e);
  } finally {
    await session.close();
  };
}