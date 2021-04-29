import { compareLocations } from '../../shared/location/location';
import { getSession } from '../../shared/neo4j/neo4j'
import { getRelationship, getSearchResult, getUserInfoT } from '../../shared/neo4j/queries';
import { info, internalError } from '../../shared/utils';

export const getResearchResult = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    const userInfo = await getUserInfoT({ token }, session, internalError(res));
    const agegap = userInfo[0].properties.Agegap ? userInfo[0].properties.Agegap : [18, 80];
    const proximity = userInfo[0].properties.Proximity ? userInfo[0].properties.Proximity : 24;
    const popularity = userInfo[0].properties.Lfpopularity ? userInfo[0].properties.Lfpopularity : [0, 10];
    const interests = userInfo[0].properties.Lfinterests ? userInfo[0].properties.Lfinterests : [''];
    const results = await getSearchResult({ agegap, popularity }, session, internalError(res));
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
      let matched = 0;
      if (interests.length !== 1 &&  interests[1] !== ['']) {
        for (const interest of element.properties.Interests) {
          for (const match of interests) {
            if (interest === match)
              matched = 1;
          }
        }
      }
      if (distance > proximity || (matched === 0 && (interests.length !== 1 &&  interests[1] !== [''])))
        results.splice(index, 1);
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