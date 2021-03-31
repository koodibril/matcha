import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { createRelationship, getRelationship, updateRelationship } from '../../shared/neo4j/queries';
import { addNotifications, NOTIFICATION_LIKE, NOTIFICATION_LOST_MATCH, NOTIFICATION_NEW_MATCH } from '../notification/addNotification';



export const likeProfile = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    let match = false;
    const block = false;
    let like = true;
    let relationship = await getRelationship({ token, username }, session, internalError(res));
    console.log(relationship);
    if (relationship[1] && relationship[1].properties.Like === true)
      match = true;
    if (!relationship) {
      relationship = await createRelationship({ token, username, match, block, like}, session, internalError(res));
      match ? addNotifications(token, username, NOTIFICATION_NEW_MATCH) 
      && addNotifications(token, '', NOTIFICATION_LIKE) 
      && addNotifications(token, username, NOTIFICATION_LIKE)
      : addNotifications(token, username, NOTIFICATION_LIKE);
    } else if (relationship[0].properties.Like === true){
        like = false;
        match = false;
        relationship = await updateRelationship({ token, username, match, block, like}, session, internalError(res));
        addNotifications(token, username, NOTIFICATION_LOST_MATCH);
    } else {
      relationship = await updateRelationship({ token, username, match, block, like}, session, internalError(res));
      match ? addNotifications(token, username, NOTIFICATION_NEW_MATCH) 
      && addNotifications(token, '', NOTIFICATION_LIKE) 
      && addNotifications(token, username, NOTIFICATION_LIKE)
      : addNotifications(token, username, NOTIFICATION_LIKE);
    }

    like ? info(`user liked`) : info(`user unliked`);
    return res
      .status(200)
      .json({ relationship });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}