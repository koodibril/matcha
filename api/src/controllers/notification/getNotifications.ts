import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getUserInfoI, getUserInfoT } from '../../shared/neo4j/queries';



export const getNotifications = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    const userInfo = await getUserInfoT({token}, session, internalError(res));
    if (!userInfo[0]) return conflict(res, "User doesn't exist1");
    const notifications = userInfo[0].properties.Notifications;
    if (notifications) {
      let index = 0;
      for (const element of notifications) {
        const id = parseInt(element.split("Id:")[1].split("Date:")[0]);
        const userInfoI = await getUserInfoI({id}, session, internalError);
        if (!userInfoI[0]) return conflict(res, "User doesn't exist2");
        const split = element.split("Id:" + id);
        notifications[index] = split[0] + "Id:" + userInfoI[0].properties.Username + split[1];
        index++;
      }
    }

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