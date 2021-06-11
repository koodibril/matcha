import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getRelationship } from '../../shared/neo4j/queries';



export const getRelationshipInfo = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    const relationship = await getRelationship({ token, username }, session, internalError(res));
    console.log(relationship);
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