import { getSession } from '../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../shared/utils';
import { getUserInfoT, getUserInfoU } from '../../shared/neo4j/queries';
import { addNotifications, NOTIFICATION_VISIT } from '../notification/addNotification';
import { compareLocations } from '../../shared/location/location';



export const getProfileInfo = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const username = req.body.username;

  try {
    const userInfo = username ? await getUserInfoU({ username }, session) as any : await getUserInfoT({ token }, session) as any;
    if (!userInfo) return conflict(res, `Profile (${username}) doesn't exist`);

    if (username) {
      const userone = await getUserInfoT({token}, session) as any;
      const latitudeOne = userone.properties.Latitude;
      const longitudeOne = userone.properties.Longitude;
      const latitudeTwo = userInfo.properties.Latitude;
      const longitudeTwo = userInfo.properties.Longitude;
      const distance = compareLocations(latitudeOne, longitudeOne, latitudeTwo, longitudeTwo);
      userInfo.properties.Distance = distance;
      await addNotifications(token, username, NOTIFICATION_VISIT);
    }

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