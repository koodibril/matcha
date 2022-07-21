import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { compareLocations } from '../../research/utils/location';
import { getUser } from '../../user/utils/getUser';
import { getRelationships } from '../utils/getRelationship';
import { getMatchedRelationships } from '../utils/getMatchedRelationships';



export const getMatchedProfiles = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    const userInfo = await getUser(session, { token });
    if (!userInfo[0]) return conflict(res, "Profile (null) doesn't exist");
    const results = await getMatchedRelationships(session, token);
    let index = 0;
    const latitudeOne = userInfo[0].properties.Latitude;
    const longitudeOne = userInfo[0].properties.Longitude;
    for (const element of results) {
      const username = element.properties.Username;
      const latitudeTwo = element.properties.Latitude;
      const longitudeTwo = element.properties.Longitude;
      const distance = compareLocations(latitudeOne, longitudeOne, latitudeTwo, longitudeTwo);
      const relationship = await getRelationships(session, token, username);
      results[index].properties.relationship = relationship[0] && relationship[0].start === userInfo[0].identity ? relationship[0] : relationship[1];
      results[index].properties.Distance = distance;
      index++;
    }

    info(`matched profiles collected`);
    return res
      .status(200)
      .json({ results })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}