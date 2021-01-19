import { getSession } from '../../shared/neo4j/neo4j'
import { getToken } from '../../shared/jwt/getToken';
import { info, internalError, conflict } from '../../shared/utils';
import { getUserPassword } from '../../shared/neo4j/queries';
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

    const token = getToken({ username });

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