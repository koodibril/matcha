import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { getUser } from '../../user/utils/getUser';

export const getFilter = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    const userInfo = await getUser(session, { token });
    if (!userInfo[0]) return conflict(res, "Profile (null) doesn't exist");
    let agegap = userInfo[0].properties.Agegap ? userInfo[0].properties.Agegap : [18, 80];
    let proximity = userInfo[0].properties.Proximity ? userInfo[0].properties.Proximity : 200;
    let lfpopularity = userInfo[0].properties.Lfpopularity ? userInfo[0].properties.Lfpopularity : [0, 2000];
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