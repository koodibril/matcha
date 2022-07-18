import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { getRelationships } from '../utils/getRelationship';



export const getRelationshipInfo = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    const relationship = await getRelationships(session, token, username, internalError(res));
    if (!relationship[0]) return conflict(res, `Relationship with (${username}) doesn't exist`);

    info(`relationship collected`);
    return res
      .status(200)
      .json({ relationship })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}