import { getSession } from '../../../shared/neo4j/neo4j'
import { info, internalError } from '../../../shared/utils';
import { updateName } from '../../../shared/neo4j/queries';



export const changeName = async (req: any, res: any) => {
  const session = getSession();
  let token = req.body.token;
  const name = req.body.name;

  try {
    const userInfo = await updateName({ token, name }, session, internalError(res));

    info(`Name Updated !`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}