import { getSession } from '../../shared/neo4j/neo4j';
import { getToken } from '../../shared/jwt/getToken';
import { info, internalError, conflict } from '../../shared/utils';
import { getUserMatchCount, getUserEmailCount, createUser } from '../../shared/neo4j/queries';
import { hashPassword } from './hashPassword';
import { ACTIVATION_EMAIL, sendMail } from '../../shared/mail/mailer';

export const signup = async (req: any, res: any) => {
  const session = getSession();
  const {
    username,
    email,
    password
  } = req.body;
  const pictures = ['', '', '', '', ''];
  const active = false;
  const valid = false;
  const token = getToken({ username });
  const userParams = { username, email, password, token, pictures, active, valid };
  userParams.password = await hashPassword(password);

  try {
    const userMatch = await getUserMatchCount({ username }, session);
    if (userMatch > 0) return conflict(res, `Username (${username}) already in use`);

    const emailMatch = await getUserEmailCount({ email }, session);
    if (emailMatch > 0) return conflict(res, `Email (${email}) already in use`);

    await createUser(userParams, session, internalError(res));
    sendMail(email, token, username, ACTIVATION_EMAIL);

    info(`New user account, welcome to ${username}`);
    return res
      .status(200)
      .json({ token });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
}