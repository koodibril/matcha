import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getRelationship } from '../../shared/neo4j/queries';



export const getRelationshipInfo = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.user;

  try {
    const relationship = await getRelationship({ token, username }, session, internalError(res));

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