import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getUserInfoT } from '../../shared/neo4j/queries';



export const getNotifications = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    const userInfo = await getUserInfoT({token}, session, internalError(res));
    if (!userInfo[0]) return conflict(res, "User doesn't exist");
    const notifications = userInfo[0].properties.Notifications;

    info(`notifications collected`);
    return res
      .status(200)
      .json({ notifications })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}