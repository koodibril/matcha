import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getUserInfoT, updatePassword } from '../../shared/neo4j/queries';



export const changePassword = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const password = req.body.password;

  try {
    const userInfo = await getUserInfoT({ token }, session) as any;
    if (!userInfo) {
        return conflict(res, `Your token is invalid`);
    } else {
        await updatePassword({ token, password }, session);
    }

    info(`User activated !`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}