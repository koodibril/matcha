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
    const matchingPassword = await getUserPassword({ username }, session);
    const passwordMatch = await checkPassword(password, matchingPassword);
    if (!passwordMatch) return conflict(res, `Credentials for (${username}) are incorrect`);

    const activated = await getUserInfoU({ username }, session) as any;
    if (activated.properties.Active === false) return conflict(res, `You must activate your account, check your emails !`);

    const token = getToken({ username });
    const updated = await updateToken({ username, token }, session);
    if (!updated || token !== updated) return conflict(res, `Error when generating new token for (${username})`);

    const valid = activated.properties.Valid;
    console.log(valid);
    console.log(token);

    info(`User '${username}' logged in`);
    return res
      .status(200)
      .json({ token, valid });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}