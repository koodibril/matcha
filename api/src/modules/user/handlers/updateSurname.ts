import { getSession } from '../../../shared/neo4j/neo4j'
import { info, internalError } from '../../../shared/utils';
import { updateSurname } from '../../../shared/neo4j/queries';



export const changeSurname = async (req: any, res: any) => {
  const session = getSession();
  let token = req.body.token;
  const surname = req.body.surname;

  try {
    const userInfo = await updateSurname({ token, surname }, session, internalError(res));

    info(`Surname Updated !`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}