import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { createRelationship, getRelationship, getUserInfoT, updateRelationship } from '../../shared/neo4j/queries';
import { addNotifications, NOTIFICATION_LIKE, NOTIFICATION_LOST_MATCH, NOTIFICATION_NEW_MATCH } from '../notification/addNotification';



export const likeProfile = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    let match = false;
    const block = false;
    let like = true;
    let relationships = await getRelationship({ token, username }, session, internalError(res));
    let relationship;
    let likedback;
    const userInfo = await getUserInfoT({ token }, session, internalError(res));
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
      relationship = await createRelationship({ token, username, match, block, like}, session, internalError(res));
      console.log('created relationship'); 
      console.log(relationship);
      match ? addNotifications(token, username, NOTIFICATION_NEW_MATCH) 
      && addNotifications(token, '', NOTIFICATION_LIKE) 
      && addNotifications(token, username, NOTIFICATION_LIKE)
      : addNotifications(token, username, NOTIFICATION_LIKE);
      relationship = await updateRelationship({ token, username, match, block, like}, session, internalError(res));
    } else if (relationship.properties.Like === true){
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