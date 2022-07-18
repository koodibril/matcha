import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { addNotifications, NOTIFICATION_LIKE, NOTIFICATION_LOST_MATCH, NOTIFICATION_NEW_MATCH } from '../../notifications/handlers/addNotification';
import { getRelationships } from '../utils/getRelationship';
import { getUser } from '../../user/utils/getUser';
import { createRelationship } from '../utils/createRelationship';
import { updateRelationship } from '../utils/updateRelationship';



export const likeProfile = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    let match = false;
    const block = false;
    let like = true;
    let relationships = await getRelationships(session, token, username, internalError(res));
    let relationship;
    let likedback;
    const userInfo = await getUser(session, { token }, internalError(res));
    if (!userInfo[0]) return conflict(res, "Profile (null) doesn't exist");
    for (const element of relationships) {
      if (element.start === userInfo[0].identity)
        relationship = element;
      else
        likedback = element;
    }

    if (likedback && likedback.properties.Like === true)
      match = true;
    if (!relationship) {
      relationship = await createRelationship(session, { match, block, like}, token, username, internalError(res));
      if (match) {
        addNotifications(token, username, NOTIFICATION_NEW_MATCH);
        addNotifications(token, '', NOTIFICATION_LIKE);
        addNotifications(token, username, NOTIFICATION_LIKE);
      } else {
        addNotifications(token, username, NOTIFICATION_LIKE);
      }
      relationship = await updateRelationship(session, { match, block, like}, token, username, internalError(res));
    } else if (relationship.properties.Like === true){
        like = false;
        match = false;
        relationship = await updateRelationship(session, { match, block, like}, token, username, internalError(res));
        addNotifications(token, username, NOTIFICATION_LOST_MATCH);
    } else {
      relationship = await updateRelationship(session, { match, block, like}, token, username, internalError(res));
      if (match) {
        addNotifications(token, username, NOTIFICATION_NEW_MATCH);
        addNotifications(token, '', NOTIFICATION_LIKE);
        addNotifications(token, username, NOTIFICATION_LIKE);
      } else {
        addNotifications(token, username, NOTIFICATION_LIKE);
      }
    }

    like ? info(`user ` + userInfo[0].properties.Username + ` liked ` + username) : 
    info(`user ` + userInfo[0].properties.Username + ` unliked ` + username);
    return res
      .status(200)
      .json({ relationship });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}