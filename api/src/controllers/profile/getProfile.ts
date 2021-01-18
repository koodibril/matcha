import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getUserInfo } from '../../shared/neo4j/queries';



export const getProfileInfo = async (req: any, res: any) => {
  const session = getSession();
  const username = 'asd';

  try {
    const userInfo = await getUserInfo({ username }, session);
    console.log(userInfo);

    info(`User '${username}' logged in`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}