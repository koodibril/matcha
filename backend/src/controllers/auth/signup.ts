import { getSession } from '../../shared/neo4j/neo4j';
import { getToken } from '../../shared/jwt/getToken';
import { internalError, unauthorized } from '../../shared/utils';
import { getUserMatchCount, getUserEmailCount, createUser } from '../../shared/neo4j/queries';

export const signup = async (req: any, res: any, next: any) => {
  console.log('salut')
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
    console.log('1')
    const userMatch = await getUserMatchCount({ username }, session);
    if (userMatch > 0) unauthorized(res, 'Username already in use');

    console.log('2')
    const emailMatch = await getUserEmailCount({ email }, session);
    if (emailMatch > 0) unauthorized(res, 'Email already in use');

    console.log('3')
    await createUser(userParams, session, internalError(res));
    console.log('before returning')
    await res.status(200).json({ token });
  } catch (e) {
    console.log('4')
    internalError(res)(e);
  } finally {
    // await session.close();
  }
}