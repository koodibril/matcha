import { compareLocations } from '../../shared/location/location';
import { getSession } from '../../shared/neo4j/neo4j'
import { getRelationship, getSearchResult, getUserInfoT } from '../../shared/neo4j/queries';
import { conflict, info, internalError } from '../../shared/utils';

export const getResearchResult = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    const userInfo = await getUserInfoT({ token }, session, internalError(res));
    if (!userInfo[0]) return conflict(res, "Profile (null) doesn't exist");
    if (!userInfo[0].properties.Valid) return conflict(res, "You need to upload one picture at least");
    const agegap = userInfo[0].properties.Agegap ? userInfo[0].properties.Agegap : [18, 80];
    const popularity = userInfo[0].properties.Lfpopularity ? userInfo[0].properties.Lfpopularity : [0, 10];
    const sexo = userInfo[0].properties.Sexo;
    const latitude = userInfo[0].properties.Latitude;
    const longitude = userInfo[0].properties.Longitude;
    info('starting query');
    let results = await getSearchResult({ agegap, popularity, token, sexo, latitude, longitude }, session, internalError(res));
    info('query finished');
    let index = 0;
    const latitudeOne = userInfo[0].properties.Latitude;
    const longitudeOne = userInfo[0].properties.Longitude;
    for (const element of results) {
      const username = element.properties.Username;
      const latitudeTwo = element.properties.Latitude;
      const longitudeTwo = element.properties.Longitude;
      const distance = compareLocations(latitudeOne, longitudeOne, latitudeTwo, longitudeTwo);
      const relationship = await getRelationship({ token, username }, session, internalError(res));
      results[index].properties.relationship = relationship;
      results[index].properties.Distance = distance;
      index++;
    }

    info(`userlist collected`);
    return res
      .status(200)
      .json({ results })
  } catch (error) {
    return internalError(res)(error);
  } finally {
    await session.close();
  };
}