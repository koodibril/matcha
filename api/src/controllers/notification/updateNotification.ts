import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getUserInfoT, updateUserNotification } from '../../shared/neo4j/queries';



export const updateNotification = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const index = req.body.index;

  try {
    const userInfo = await getUserInfoT({token}, session, internalError(res));
    const notifications = userInfo[0].properties.Notifications;
    const notification = notifications[index].split('false');
    const newnotification = notification[0] + 'true' + notification[1];
    notifications[index] = newnotification;

    await updateUserNotification({token, notifications}, session, internalError);

    info(`notifications updated`);
    return res
      .status(200)
      .json({ notifications })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}