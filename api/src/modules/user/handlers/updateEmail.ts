import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { getUserInfoE, updateEmail } from '../../../shared/neo4j/queries';



export const changeEmail = async (req: any, res: any) => {
  const session = getSession();
  let token = req.body.token;
  const email = req.body.email;

  try {
    const userInfo = await getUserInfoE({ email }, session, internalError(res));
    if (userInfo.length >= 1) {
        return conflict(res, `Email already taken`);
    } else {
        await updateEmail({ token, email }, session, internalError(res));
    }

    info(`Email Updated !`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}