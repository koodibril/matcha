import { getSession } from '../../../shared/neo4j/neo4j';
import { info, internalError } from '../../../shared/utils';
import { updateUser } from '../../user/utils/updateUser';

export const updateProfile = async (req: any, res: any) => {
  const session = getSession();
  const {
    age,
    gender,
    sexo,
    bio,
    interests,
    token
  } = req.body;
  const location = req.body.location.city;
  const latitude = req.body.location.latitude;
  const longitude = req.body.location.longitude;
  const valid = true;
  const popularity = 5;
  const userParams = { age, gender, sexo, bio, interests, location, latitude, longitude, valid, popularity };

  try {
    const userInfoU = await updateUser(session, userParams, token);
    const userInfo = userInfoU[0];

    info(`Your information have been updated`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
}