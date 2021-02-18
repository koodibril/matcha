import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { createRelationship, getRelationship, getReverseRelationship, updateRelationship } from '../../shared/neo4j/queries';



export const likeProfile = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    let match = false;
    const block = false;
    let like = true;
    let relationship = await getRelationship({ token, username }, session) as any;
    const likedback = await getReverseRelationship({ token, username }, session) as any;
    if (likedback && likedback.properties.Like === true)
      match = true;
    if (!relationship) {
      relationship = await createRelationship({ token, username, match, block, like}, session);
    } else if (relationship.properties.Like === true){
        like = false;
        match = false;
        relationship = await updateRelationship({ token, username, match, block, like}, session);
    } else {
      relationship = await updateRelationship({ token, username, match, block, like}, session);
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