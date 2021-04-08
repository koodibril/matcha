import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getUserInfoU, updateUsername } from '../../shared/neo4j/queries';



export const changeUsername = async (req: any, res: any) => {
  const session = getSession();
  let token = req.body.token;
  const username = req.body.username;

  try {
    const userInfo = await getUserInfoU({ username }, session, internalError(res));
    if (userInfo.length >= 1) {
        return conflict(res, `Username already taken`);
    } else {
        await updateUsername({ token, username }, session, internalError(res));
    }

    info(`Username Updated !`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}