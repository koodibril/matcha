import { getSession } from '../../../shared/neo4j/neo4j'
import { getToken } from '../../../shared/jwt/getToken';
import { info, internalError, conflict } from '../../../shared/utils';
import { checkPassword } from '../utils/checkPassword';
import { getUserWithUsername } from '../utils/getUserWithUsername';
import { updateUser } from '../utils/updateUser';



export const login = async (req: any, res: any) => {
  const session = getSession();
  const {
    username,
    password
  } = req.body;

  try {
    const userInfo = await getUserWithUsername(session, username, internalError(res));
    const matchingPassword = userInfo.Password;
    if (!matchingPassword[0]) return conflict(res, `Credentials for (${username}) are incorrect`);
    const passwordMatch = await checkPassword(password, matchingPassword[0]);
    if (!passwordMatch) return conflict(res, `Credentials for (${username}) are incorrect`);

    const activated = userInfo.Activate;
    if (activated[0].properties.Active === false) return conflict(res, `You must activate your account, check your emails !`);

    const token = getToken({ username });
    const updated = await updateUser(session, { username, token }, userInfo.Token, internalError(res));
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