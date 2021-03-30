import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getUserInfoT, updatePassword, updateToken } from '../../shared/neo4j/queries';
import { hashPassword } from './hashPassword';
import { getToken } from '../../shared/jwt/getToken';



export const changePassword = async (req: any, res: any) => {
  const session = getSession();
  let token = req.body.token;
  const password = await hashPassword(req.body.password);

  try {
    const userInfo = await getUserInfoT({ token }, session, internalError(res)) as any;
    if (!userInfo) {
        return conflict(res, `Your token is invalid`);
    } else {
        await updatePassword({ token, password }, session, internalError(res));
        const username = userInfo.properties.Username;
        token = getToken({ username });
        const updated = await updateToken({ username, token }, session, internalError(res));
        if (!updated || token !== updated) return conflict(res, `Error when generating new token for (${username})`);
    }

    info(`Password Updated !`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}