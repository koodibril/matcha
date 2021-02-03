import { getSession } from '../../shared/neo4j/neo4j';
import { info, internalError, conflict } from '../../shared/utils';
import { getUserMatchCount, getUserEmailCount, getUserInfoT, updateUserInfo } from '../../shared/neo4j/queries';

export const updateProfile = async (req: any, res: any) => {
  const session = getSession();
  const {
    username,
    firstname,
    lastname,
    email,
    token
  } = req.body;
  const userParams = { username, firstname, lastname, email, token };

  try {
    const oldInfo = await getUserInfoT({ token }, session) as any;
    if (oldInfo.properties.Username !== username) {
      const userMatch = await getUserMatchCount({ username }, session);
      if (userMatch > 0) return conflict(res, `Username (${username}) already in use`);
    } 
    
    if (oldInfo.properties.Email !== email) {
      const emailMatch = await getUserEmailCount({ email }, session);
      if (emailMatch > 0) return conflict(res, `Email (${email}) already in use`);
    }

    const userInfo = await updateUserInfo(userParams, session);

    info(`Your information have been updated ${username}`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
}