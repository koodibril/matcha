import { getSession } from '../../../shared/neo4j/neo4j'
import { getToken } from '../../../shared/jwt/getToken';
import { info, internalError, conflict, unauthorized } from '../../../shared/utils';
import { checkPassword } from '../utils/checkPassword';
import { updateUser } from '../utils/updateUser';
import { getUser } from '../utils/getUser';



export const login = async (req: any, res: any) => {
  const session = getSession();
  const {
    username,
    password
  } = req.body;

  try {
    const userInfo = await getUser(session, {username}, internalError(res));
    const matchingPassword = userInfo[0]?.properties.Password ?? null;

    if (!matchingPassword) return unauthorized(res, `Credentials for (${username}) are incorrect`);
    const passwordMatch = await checkPassword(password, matchingPassword);
    if (!passwordMatch) return conflict(res, `Credentials for (${username}) are incorrect`);

    const activated = userInfo[0].Active;
    if (activated === false) return conflict(res, `You must activate your account, check your emails !`);

    const token = getToken({ username });
    const updated = await updateUser(session, { username, token }, userInfo[0].properties.Token, internalError(res));
    if (!updated[0] || token !== updated[0].properties.Token) return conflict(res, `Error when generating new token for (${username})`);

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
