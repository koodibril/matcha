import { getSession } from '../../shared/neo4j/neo4j'
import { getUserInfoT } from '../../shared/neo4j/queries';
import { info, internalError } from '../../shared/utils';

export const getFilter = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    const userInfo = await getUserInfoT({ token }, session, internalError(res));
    let agegap = userInfo[0].properties.Agegap ? userInfo[0].properties.Agegap : [18, 80];
    let proximity = userInfo[0].properties.Proximity ? userInfo[0].properties.Proximity : 24;
    let lfpopularity = userInfo[0].properties.Lfpopularity ? userInfo[0].properties.Lfpopularity : [0, 10];
    let lfinterests = userInfo[0].properties.Lfinterests ? userInfo[0].properties.Lfinterests : [''];
    const filter = { agegap, proximity, lfpopularity, lfinterests};

    info(`filter collected`);
    return res
      .status(200)
      .json({ filter })
  } catch (error) {
    return internalError(res)(error);
  } finally {
    await session.close();
  };
}