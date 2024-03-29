import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { getUser } from '../../user/utils/getUser';
import { updateUser } from '../../user/utils/updateUser';

export const updateFilter = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    let userInfo = await getUser(session, { token });
    if (!userInfo[0]) return conflict(res, "Profile (null) doesn't exist");
    let agegap = userInfo[0].properties.Agegap ? userInfo[0].properties.Agegap : [18, 80];
    let proximity = userInfo[0].properties.Proximity ? userInfo[0].properties.Proximity : 200;
    let lfpopularity = userInfo[0].properties.Lfpopularity ? userInfo[0].properties.Lfpopularity : [1100, 1300];
    let lfinterests = userInfo[0].properties.Lfinterests ? userInfo[0].properties.Lfinterests : [''];
    if (req.body.ageGap)
        agegap = req.body.ageGap;
    if (req.body.proximity)
        proximity = req.body.proximity;
    if (req.body.popularity)
        lfpopularity = req.body.popularity;
    if (req.body.interests)
        lfinterests = req.body.interests;
    userInfo = await updateUser(session, { agegap, proximity, lfpopularity, lfinterests }, token);
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