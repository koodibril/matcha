import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getUserInfoS, updateOnline } from '../../shared/neo4j/queries';

export const disconnectSocket = async (socket: string) => {
  const session = getSession();

  try {
      const online = Date.now();
      const user = await getUserInfoS({ socket }, session, internalError);
      const token = user[0].properties.Token;
      const update = await updateOnline({ token, online }, session, internalError);
      info(`socket ` + socket + ` destroyed for user ` + update[0].properties.Username + ` last connection on: ` + update[0].properties.Online);

    return (socket);
  } catch (e) {
    return internalError(e);
  } finally {
    await session.close();
  };
}