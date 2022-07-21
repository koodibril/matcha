import { getSession } from '../../../shared/neo4j/neo4j'
import { info, internalError } from '../../../shared/utils';
import { updateUser } from '../../user/utils/updateUser';

export const clearNotification = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    const notifications = <string[]>[];
    await updateUser(session, {notifications}, token);

    info(`notification viewed`);
    return res
      .status(200)
      .json({ notifications })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}