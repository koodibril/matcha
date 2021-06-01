import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { updateUserNotification } from '../../shared/neo4j/queries';

export const clearNotification = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    const notifications = [''];
    await updateUserNotification({token, notifications}, session, internalError);

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