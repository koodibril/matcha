import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getUserInfoT, getUserInfoU, updateUsernameNotification, updateUserNotification } from '../../shared/neo4j/queries';

export const NOTIFICATION_LIKE = 'A User liked you !';
export const NOTIFICATION_VISIT = 'A User checked your profile !';
export const NOTIFICATION_MESSAGE = 'You have a new message !';
export const NOTIFICATION_NEW_MATCH = 'You have a new match !';
export const NOTIFICATION_LOST_MATCH = 'You lost a match';

export const addNotifications = async (token: string, username: string, notification: string) => {
  const session = getSession();

  try {
    let userInfo = username ? await getUserInfoU({username}, session) : await getUserInfoT({token}, session) as any;
    const notifications = userInfo.properties.Notifications ? userInfo.properties.Notifications : [];

    const newNotification = 'Viewed:false' + 'Date:' + 10 + 'Notification:' + notification;
    notifications.push(newNotification);
    userInfo = username ? await updateUsernameNotification({username, notifications}, session) : await updateUserNotification({token, notifications}, session);

    info(`notifications updated`);
    return (userInfo);
  } catch (e) {
    return internalError(e);
  } finally {
    await session.close();
  };
}