import { getSession } from '../../../shared/neo4j/neo4j'
import { info, internalError } from '../../../shared/utils';
import { getSocketIo } from '../../../server';
import { getUser } from '../../user/utils/getUser';
import { updateUser } from '../../user/utils/updateUser';
import { getRelationships } from '../../relationship/utils/getRelationship';

export const NOTIFICATION_LIKE = 'A User liked you !';
export const NOTIFICATION_VISIT = 'A User checked your profile !';
export const NOTIFICATION_MESSAGE = 'You have a new message !';
export const NOTIFICATION_NEW_MATCH = 'You have a new match !';
export const NOTIFICATION_LOST_MATCH = 'You lost a match';

export const addNotifications = async (token: string, username: string, notification: string) => {
  const session = getSession();

  try {
    const userInfoT = await getUser(session, { token });
    let userInfo = await getUser(session, { username });
    if (notification === NOTIFICATION_VISIT) {
      const rels = await getRelationships(session, token, username);
      for (const rel of rels) {
        if (rel.properties.Block === true) {
          return (userInfo[0]);
        }
      }
    }

    const notifications = userInfo[0].properties.Notifications ? userInfo[0].properties.Notifications : [];

    const newNotification = 'Viewed:false' + 'Id:' + userInfoT[0].identity + 'Date:' + Date.now() + 'Notification:' + notification;
    notifications.unshift(newNotification);
    userInfo = username ? await updateUser(session, {notifications}, userInfo[0].properties.Token) : await updateUser(session, {notifications}, token);
    const io = getSocketIo();
    io.to(userInfo[0].properties.Socket).emit('notification', null);

    info(`new notification added: ` + notification);
    return (userInfo[0]);
  } catch (e) {
    return internalError(e);
  } finally {
    await session.close();
  };
}

export const addNotification = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.username;
  const notification = req.body.notification;

  try {
    const userInfoT = await getUser(session, { token });
    let userInfo = await getUser(session, { username });
    const notifications = userInfo[0].properties.Notifications ? userInfo[0].properties.Notifications : [];

    const newNotification = 'Viewed:false' + 'Id:' + userInfoT[0].identity + 'Date:' + Date.now() + 'Notification:' + notification;
    notifications.unshift(newNotification);
    userInfo = username ? await updateUser(session, {notifications}, userInfo[0].properties.Token) : await updateUser(session, {notifications}, token);

    const notif = userInfoT[0].properties.Notifications;
    info(`notifications collected`);
    return res
      .status(200)
      .json({ notif })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}