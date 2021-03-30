import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { createRelationship, getRelationship, updateRelationship } from '../../shared/neo4j/queries';



export const blockProfile = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    const match = false;
    const block = true;
    const like = false;
    let relationship = await getRelationship({ token, username }, session, internalError(res)) as any;
    if (!relationship) {
      relationship = await createRelationship({ token, username, match, block, like}, session, internalError(res));
    } else if (relationship.properties.Block !== true){
        relationship = await updateRelationship({ token, username, match, block, like}, session, internalError(res));
    }

    info(`user blocked`);
    return res
      .status(200)
      .json({ relationship })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}