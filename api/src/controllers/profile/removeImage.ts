import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getUserInfo } from '../../shared/neo4j/queries';



export const removeImage = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const picture = req.body.picture;

  try {
    const userInfo = await getUserInfo({ token }, session);
    console.log(picture);

    info(`informations collected`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}