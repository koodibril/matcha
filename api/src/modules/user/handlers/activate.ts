import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { getToken } from '../../../shared/jwt/getToken';
import { getUserWithToken } from '../utils/getUserWithToken';
import { updateUser } from '../utils/updateUser';



export const activateUser = async (req: any, res: any) => {
  const session = getSession();
  let token = req.body.token;

  try {
    const userInfo = await getUserWithToken(session, token, internalError(res));
    if (!userInfo[0]) {
        return conflict(res, `Your token is invalid`);
    } else {
        const active = true;
        const email = userInfo[0].properties.Email;
        const username = userInfo[0].properties.Username;
        token = getToken({ username });
        const updated = await updateUser(session, { token, email, username, active }, userInfo.Token, internalError(res));
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