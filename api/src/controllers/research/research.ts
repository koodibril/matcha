import { compareLocations } from '../../shared/location/location';
import { getSession } from '../../shared/neo4j/neo4j'
import { getRelationship, getSearchResult, getUserInfoT } from '../../shared/neo4j/queries';
import { info, internalError } from '../../shared/utils';

export const getResearchResult = async (req: any, res: any) => {
  const session = getSession();
  const {
      ageGap,
      proximity,
      popularity,
      interests,
      token
  } = req.body;

  try {
    const userInfo = await getUserInfoT({ token }, session, internalError(res));
    const results = await getSearchResult({ ageGap, proximity, popularity, interests }, session, internalError(res));
    let index = 0;
    const latitudeOne = userInfo[0].properties.Latitude;
    const longitudeOne = userInfo[0].properties.Longitude;
    for (const element of results) {
      const username = element.properties.Username;
      const latitudeTwo = element.properties.Latitude;
      const longitudeTwo = element.properties.Longitude;
      const distance = compareLocations(latitudeOne, longitudeOne, latitudeTwo, longitudeTwo);
      const relationship = await getRelationship({ token, username}, session, internalError(res));
      results[index].properties.relationship = relationship[0] && relationship[0].start === userInfo[0].identity ? relationship[0] : relationship[1];
      results[index].properties.Distance = distance;
      index++;
    }

    info(`userlist collected`);
    return res
      .status(200)
      .json({ results })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}