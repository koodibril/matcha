import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { getUser } from '../../user/utils/getUser';
import { updateUser } from '../../user/utils/updateUser';
import { getUserWithId } from '../../user/utils/getUserWithId';



export const updateNotification = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const index = req.body.index;

  try {
    const userInfo = await getUser(session, {token}, internalError(res));
    const notifications = userInfo[0].properties.Notifications;
    const notification = notifications[index].split('false');
    if (notification[0]) {
      const newnotification = notification[0] + 'true' + notification[1];
      notifications[index] = newnotification;
      await updateUser(session, {notifications}, token, internalError);
    }
    if (notifications) {
      let index = 0;
      for (const element of notifications) {
        const id = parseInt(element.split("Id:")[1].split("Date:")[0]);
        const userInfoI = await getUserWithId(session, id, internalError);
        if (!userInfoI[0]) return conflict(res, "User doesn't exist2");
        const split = element.split("Id:" + id);
        notifications[index] = split[0] + "Id:" + userInfoI[0].properties.Username + split[1];
        index++;
      }
    }

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