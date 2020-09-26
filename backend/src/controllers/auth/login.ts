import { getSession } from '../../shared/neo4j/neo4j'
import { getToken } from '../../shared/jwt/getToken';
import { notFound, unauthorized, internalError } from '../../shared/utils';
import { getUserMatchCount, getUserPassword } from '../../shared/neo4j/queries';



export const login = async (req: any, res: any, next: any) => {
  const session = getSession();
  const { username, password } = req.body;

  try {
    const matchingUser = await getUserMatchCount({ username }, session);
    if (matchingUser <= 0) return notFound(res, "User mismatch");

    const matchingPassword = await getUserPassword({ username, password }, session);
    if (password !== matchingPassword) return unauthorized(res, "Wrong user/password");

    const token = getToken({ username });
    return res
      .status(200)
      .json({ token });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}