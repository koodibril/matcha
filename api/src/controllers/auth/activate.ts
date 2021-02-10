import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getUserInfoT, updateToken, updateUserInfo } from '../../shared/neo4j/queries';
import { getToken } from '../../shared/jwt/getToken';



export const activateUser = async (req: any, res: any) => {
  const session = getSession();
  let token = req.body.token;

  try {
    const userInfo = await getUserInfoT({ token }, session) as any;
    if (!userInfo) {
        return conflict(res, `Your token is invalid`);
    } else {
        const active = true;
        const email = userInfo.properties.Email;
        const username = userInfo.properties.Username;
        await updateUserInfo({ token, email, username, active }, session);
        token = getToken({ username });
        const updated = await updateToken({ username, token }, session);
        if (!updated || token !== updated) return conflict(res, `Error when generating new token for (${username})`);
    }

    info(`User activated !`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}