import { getSession } from '../../shared/neo4j/neo4j';
import { getToken } from '../../shared/jwt/getToken';
import { info, internalError, conflict } from '../../shared/utils';
import { getUserMatchCount, getUserEmailCount, createUser } from '../../shared/neo4j/queries';

export const updateProfileInfo = async (req: any, res: any) => {
  const session = getSession();
  const {
    username,
    firstname,
    lastname,
    email,
    password
  } = req.body;
  const token = getToken({ username });
  const userParams = { username, firstname, lastname, email, password, token };

  try {
    const userMatch = await getUserMatchCount({ username }, session);
    if (userMatch > 0) return conflict(res, `Username (${username}) already in use`);

    const emailMatch = await getUserEmailCount({ email }, session);
    if (emailMatch > 0) return conflict(res, `Email (${email}) already in use`);

    await createUser(userParams, session, internalError(res));

    info(`Your information have been updated ${username}`);
    return res
      .status(200)
      .json({ token });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
}