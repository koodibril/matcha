import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getUserInfoT, getUserInfoU } from '../../shared/neo4j/queries';



export const getProfileInfo = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.username;

  try {
    const userInfo = username ? await getUserInfoU({ username }, session) : await getUserInfoT({ token }, session);
    if (!userInfo) return conflict(res, `Profile (${username}) doesn't exist`);

    info(`informations collected`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}