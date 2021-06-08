import { createChatRoom, createRelationship, createUser, getChatRoom, getMatchedRelationship, getRelationship, getSearchResult, getUserEmailCount, getUserInfoE, getUserInfoT, getUserInfoU, getUserMatchCount, getUserPassword, updateChatRoom, updatePassword, updateRelationship, updateToken, updateUserData, updateUserInfo, updateUsernameNotification, updateUserNotification, updateUserPictures } from "./queries"
import { getSession } from '../../shared/neo4j/neo4j'
import { internalError } from "../utils";

export const relaseTheKraken = async (res: any) => {
    const session = getSession();

      const username = 'dummy';
      const password = 'dumb';
      const email = 'dumb@dumbed.com';
      const age = 18;
      const gender = 'male';
      const sexo = 'women';
      const bio = 'I wish I was real..';
      const interests = ['mountain', 'yolo', 'swag'];
      const pictures = ['', '', '', '', ''];
      const notifications = ['', ''];
      const active = true;
      const valid = true;
      const token = 'asdasdasd';
      const location = 'Paris';
      const latitude = 123;
      const longitude = 45;
      const match = true;
      const block = true;
      const like = true;
      const agegap = [0, 100];
      const messages = ['kuku'];

    try {
        console.log('CREATING USER');
        console.log( await createUser({username, password, email, active, valid, token, pictures}, session, internalError(res)));
        console.log('GETTING USER WITH SAME NAME');
        console.log( await getUserMatchCount({username}, session, internalError(res)));
        console.log('GETTING USER WITH SAME EMAIL');
        console.log( await getUserEmailCount({email}, session, internalError(res)));
        console.log('GETTING USER PASSWORD');
        console.log( await getUserPassword({username}, session, internalError(res)));
    
        console.log('GETTING USER INFO FROM TOKEN');
        console.log( await getUserInfoT({token}, session, internalError(res)));
        console.log('GETTING USER INFO FROM USERNAME');
        console.log( await getUserInfoU({username}, session, internalError(res)));
        console.log('GETTING USER INFO FROM EMAIL');
        console.log( await getUserInfoE({email}, session, internalError(res)));
    
        console.log('UPDATING TOKEN');
        console.log( await updateToken({username, token}, session, internalError(res)));
        console.log('UPDATING PICTURES');
        console.log( await updateUserPictures({username, pictures}, session, internalError(res)));
        console.log('UPDATING USER INFO');
        console.log( await updateUserInfo({token, username, email, active}, session, internalError(res)));
        console.log('UPDATING USER DATA');
        console.log( await updateUserData({token, age, gender, sexo, bio, interests, location, latitude, longitude, valid}, session, internalError(res)));
        console.log('UPDATING PASSWORD');
        console.log( await updatePassword({token, password}, session, internalError(res)));
        console.log('UPDATING NOTIFICATIONS FROM TOKEN');
        console.log( await updateUserNotification({token, notifications}, session, internalError(res)));
        console.log('UPDATING NOTIFICATIONS FROM USERNAME');
        console.log( await updateUsernameNotification({username, notifications}, session, internalError(res)));
    
        console.log('CREATE ACTION RELATIONSHIP');
        console.log( await createRelationship({token, username}, session, internalError(res)));
        console.log('GET RELATIONSHIP TOKEN/USERNAME');
        console.log( await getRelationship({token, username}, session, internalError(res)));
        console.log('UPDATE RELATIONSHIP TOKEN/USERNAME');
        console.log( await updateRelationship({token, username, match, block, like}, session, internalError(res)));
        console.log('GET RELATIONSHIP WITH MATCH');
        console.log( await getMatchedRelationship({token}, session, internalError(res)));

        console.log('GET SEARCH RESULT WITH AGE GAP');
        console.log( await getSearchResult({agegap}, session, internalError(res)));

        console.log('CREATE CHATROOM');
        console.log( await createChatRoom({token, username}, session, internalError(res)));
        console.log('GET CHATROOM');
        console.log( await getChatRoom({token, username}, session, internalError(res)));
        console.log('UPDATE CHATROOM');
        console.log( await updateChatRoom({token, username, messages}, session, internalError(res)));
      } catch (e) {
        return internalError(res)(e);
      } finally {
        await session.close();
      };
}