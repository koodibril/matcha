import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { addNotifications, NOTIFICATION_LIKE, NOTIFICATION_LOST_MATCH, NOTIFICATION_NEW_MATCH } from '../../notifications/handlers/addNotification';
import { getRelationships } from '../utils/getRelationship';
import { getUser } from '../../user/utils/getUser';
import { createRelationship } from '../utils/createRelationship';
import { updateRelationship } from '../utils/updateRelationship';
import { calculateElo } from '../../../shared/elo/elo';
import { updateUser } from '../../user/utils/updateUser';



export const likeProfile = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    let match = false;
    const block = false;
    let like = true;
    let relationships = await getRelationships(session, token, username);
    let relationship;
    let likedback;
    const userInfo = await getUser(session, { token });
    const user2Info = await getUser(session, { username });
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
      relationship = await createRelationship(session, { match, block, like}, token, username);
      if (match) {
        addNotifications(token, username, NOTIFICATION_NEW_MATCH);
      } else {
        addNotifications(token, username, NOTIFICATION_LIKE);
      }
    } else if (relationship.properties.Like === true){
        like = false;
        match = false;
        relationship = await updateRelationship(session, { match, block, like}, token, username);
        addNotifications(token, username, NOTIFICATION_LOST_MATCH);
    } else {
      relationship = await updateRelationship(session, { match, block, like}, token, username);
      if (match) {
        addNotifications(token, username, NOTIFICATION_NEW_MATCH);
      } else {
        addNotifications(token, username, NOTIFICATION_LIKE);
      }
    }

    const elo1 = userInfo[0].properties.Popularity;
    const elo2 = user2Info[0].properties.Popularity;
    const rel1 = relationship[0].properties;
    const rel2 = likedback ? likedback.properties : {Like: false};

    const popularity = calculateElo(
      elo1, 
      elo2, 
      rel1, 
      rel2);
    await updateUser(session, {popularity: popularity.elo1}, token);
    await updateUser(session, {popularity: popularity.elo2}, user2Info[0].properties.Token);

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