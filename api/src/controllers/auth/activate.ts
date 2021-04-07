import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getUserInfoT, updateToken, updateUserInfo } from '../../shared/neo4j/queries';
import { getToken } from '../../shared/jwt/getToken';



export const activateUser = async (req: any, res: any) => {
  const session = getSession();
  let token = req.body.token;

  try {
    const userInfo = await getUserInfoT({ token }, session, internalError(res));
    if (!userInfo[0]) {
        return conflict(res, `Your token is invalid`);
    } else {
        const active = true;
        const email = userInfo[0].properties.Email;
        const username = userInfo[0].properties.Username;
        await updateUserInfo({ token, email, username, active }, session, internalError(res));
        token = getToken({ username });
        const updated = await updateToken({ username, token }, session, internalError(res));
        if (!updated[0] || token !== updated[0]) return conflict(res, `Error when generating new token for (${username})`);
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