import { getSession } from '../../../shared/neo4j/neo4j'
import { info, internalError } from '../../../shared/utils';
import { getRelationships } from '../utils/getRelationship';
import { createRelationship } from '../utils/createRelationship';
import { updateRelationship } from '../utils/updateRelationship';



export const blockProfile = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    const match = false;
    const block = true;
    const like = false;
    let relationship = await getRelationships(session, token, username, internalError(res));
    if (!relationship[0]) {
      relationship = await createRelationship(session, { match, block, like}, token, username, internalError(res));
      relationship = await updateRelationship(session, { match, block, like}, token, username, internalError(res));
    } else if (relationship[0].properties.Block !== true){
      relationship = await updateRelationship(session, { match, block, like}, token, username, internalError(res));
    }
    relationship = relationship[0];

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