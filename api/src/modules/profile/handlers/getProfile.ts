import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { addNotifications, NOTIFICATION_VISIT } from '../../notifications/handlers/addNotification';
import { compareLocations } from '../../research/utils/location';
import { getUser } from '../../user/utils/getUser';



export const getProfileInfo = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.username;

  try {
    const userInfoU = username ? await getUser(session, { username }) : await getUser(session, { token });
    if (!userInfoU) return;
    if (!userInfoU[0]) return conflict(res, `Profile (${username}) doesn't exist`);

    if (username && userInfoU[0]) {
      const userone = await getUser(session, { token });
      const latitudeOne = userone[0].properties.Latitude;
      const longitudeOne = userone[0].properties.Longitude;
      const latitudeTwo = userInfoU[0].properties.Latitude;
      const longitudeTwo = userInfoU[0].properties.Longitude;
      const distance = compareLocations(latitudeOne, longitudeOne, latitudeTwo, longitudeTwo);
      userInfoU[0].properties.Distance = distance;
      await addNotifications(token, username, NOTIFICATION_VISIT);
    }
    const userInfo = userInfoU[0];
    info(`informations collected`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}