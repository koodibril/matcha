import { createRelationship, createUser, getMatchedRelationship, getRelationship, getUserEmailCount, getUserInfoE, getUserInfoT, getUserInfoU, getUserMatchCount, getUserPassword, updatePassword, updateRelationship, updateToken, updateUserData, updateUserInfo, updateUsernameNotification, updateUserNotification, updateUserPictures } from "./queries"
import { getSession } from '../../shared/neo4j/neo4j'
import { internalError } from "../utils";

export const relaseTheKraken = (res: any) => {
    const session = getSession();

    const dummy {
      username = 'dummy',
      password = 'dumb',
      email = 'dumb@dumbed.com',
      age = 18,
      gender = 'male',
      sexo = 'women',
      bio = 'I wish I was real..',
      interests = ['mountain', 'yolo', 'swag'],
      pictures = ['', '', '', '', ''],
      notifications = ['', ''],
      active = true,
      valid = true,
      token = 'asdasdasd',
      location = 'Paris',
      latitude = 123,
      longitude = 456
    };
    
    try {
        createUser(dummy, session, internalError(res));
        getUserMatchCount;
        getUserEmailCount;
        getUserPassword;
    
        getUserInfoT;
        getUserInfoU;
        getUserInfoE;
    
        updateToken;
        updateUserPictures;
        updateUserInfo;
        updateUserData;
        updatePassword;
        updateUserNotification;
        updateUsernameNotification;
    
        createRelationship;
        getRelationship;
        updateRelationship;
        getMatchedRelationship;
      } catch (e) {
        return internalError(res)(e);
      } finally {
        await session.close();
      };
}