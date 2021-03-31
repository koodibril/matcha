import { getSession } from '../../shared/neo4j/neo4j'
import { getToken } from '../../shared/jwt/getToken';
import { info, internalError, conflict } from '../../shared/utils';
import { getUserInfoU, getUserPassword, updateToken } from '../../shared/neo4j/queries';
import { checkPassword } from './checkPassword';



export const login = async (req: any, res: any) => {
  const session = getSession();
  const {
    username,
    password
  } = req.body;

  try {
    const matchingPassword = await getUserPassword({ username }, session, internalError(res));
    if (!matchingPassword[0]) return conflict(res, `Credentials for (${username}) are incorrect`);
    const passwordMatch = await checkPassword(password, matchingPassword[0]);
    if (!passwordMatch) return conflict(res, `Credentials for (${username}) are incorrect`);

    const activated = await getUserInfoU({ username }, session, internalError(res));
    if (activated[0].properties.Active === false) return conflict(res, `You must activate your account, check your emails !`);

    const token = getToken({ username });
    const updated = await updateToken({ username, token }, session, internalError(res));
    if (!updated[0] || token !== updated[0]) return conflict(res, `Error when generating new token for (${username})`);

    info(`User '${username}' logged in`);
    return res
      .status(200)
      .json({ token });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}