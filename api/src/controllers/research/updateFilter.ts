import { getSession } from '../../shared/neo4j/neo4j'
import { getUserInfoT, updateUserFilter } from '../../shared/neo4j/queries';
import { info, internalError } from '../../shared/utils';

export const updateFilter = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    let userInfo = await getUserInfoT({ token }, session, internalError(res));
    let agegap = userInfo[0].properties.Agegap ? userInfo[0].properties.Agegap : [18, 80];
    let proximity = userInfo[0].properties.Proximity ? userInfo[0].properties.Proximity : 24;
    let lfpopularity = userInfo[0].properties.Lfpopularity ? userInfo[0].properties.Lfpopularity : [0, 10];
    let lfinterests = userInfo[0].properties.Lfinterests ? userInfo[0].properties.Lfinterests : [''];
    if (req.body.ageGap)
        agegap = req.body.ageGap;
    if (req.body.proximity)
        proximity = req.body.proximity;
    if (req.body.popularity)
        lfpopularity = req.body.popularity;
    if (req.body.interests)
        lfinterests = req.body.interests;
    userInfo = await updateUserFilter({ token, agegap, proximity, lfpopularity, lfinterests }, session, internalError(res));
    const filter = { agegap, proximity, lfpopularity, lfinterests};

    info(`filter updated`);
    return res
      .status(200)
      .json({ filter })
  } catch (error) {
    return internalError(res)(error);
  } finally {
    await session.close();
  };
}