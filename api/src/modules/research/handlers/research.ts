import { compareLocations } from '../utils/location';
import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { getUser } from '../../user/utils/getUser';
import { searchUsers } from '../utils/search';
import { getRelationships } from '../../relationship/utils/getRelationship';

export const getResearchResult = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;

  try {
    const userInfo = await getUser(session, { token });
    if (!userInfo[0]) return conflict(res, "Profile (null) doesn't exist");
    const agegap = userInfo[0].properties.Agegap ? userInfo[0].properties.Agegap : [18, 80];
    const proximity = userInfo[0].properties.Proximity ? userInfo[0].properties.Proximity : 24;
    const low = userInfo[0].properties.Popularity <= 200 ? 0 : ((Math.round(userInfo[0].properties.Popularity / 200) + 1) * 100);
    const max = low + 200;
    const popularity = userInfo[0].properties.LfPopularity ? userInfo[0].properties.LfPopularity : [low, max] as [number, number];
    const Lfinterests = userInfo[0].properties.Lfinterests ? userInfo[0].properties.Lfinterests : [''];
    const interests = userInfo[0].properties.Interests;
    const gender = userInfo[0].properties.Sexo === 'Bi' ? ['Male', 'Female', 'Bi'] : [userInfo[0].properties.Sexo];
    let results = await searchUsers(session, {agegap, proximity, popularity, interests, gender, Lfinterests}, token);
    let index = 0;
    let remove = [];
    const latitudeOne = userInfo[0].properties.Latitude;
    const longitudeOne = userInfo[0].properties.Longitude;
    for (const element of results) {
      const username = element.properties.Username;
      const latitudeTwo = element.properties.Latitude;
      const longitudeTwo = element.properties.Longitude;
      const distance = compareLocations(latitudeOne, longitudeOne, latitudeTwo, longitudeTwo);
      const relationship = await getRelationships(session, token, username);
      results[index].properties.relationship = relationship;
      results[index].properties.Distance = distance;
      if ((distance > proximity && proximity != 24) || (interests.length !== 1 &&  interests[0] !== ''))
        remove.push(index);
      index++;
    }
    for (const nb of remove) {
      results.splice(nb, 1);
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