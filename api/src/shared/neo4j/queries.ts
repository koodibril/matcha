import { Session } from 'neo4j-driver';
import { generateQuery } from './querieMaker';
interface UserOptions {
  username?: string;
  password?: string;
  email?: string;
  age?: number;
  gender?: string;
  sexo?: string;
  bio?: string;
  interests?: string[];
  pictures?: string[];
  notifications?: string[];
  active?: boolean;
  valid?: boolean;
  token?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}

interface RelationshipOptions {
  token?: string;
  username?: string;
  match?: boolean;
  block?: boolean;
  like?: boolean;
}

interface Filter {
  ageGap?: number[];
  proximity?: number;
  popularity?: number[];
  interests?: string[];
}

interface ChatRoom {
  username?: string;
  token?: string;
  messages?: string[];
}

const queryCreateUser = generateQuery(['create'], ['user'], [['username', 'password', 'email', 'active', 'valid', 'token', 'pictures']], [], '', false);
const queryMatchingUser = generateQuery(['match'], ['user'], [['username']], [], '', true);
const queryMatchingEmail = generateQuery(['match'], ['user'], [['email']], [], '', true);
const queryMatchingPassword = `${generateQuery(['match'], ['user'], [['username']], [], '', false)}.Password`;

const queryGetUserInfoT = generateQuery(['match'], ['user'], [['token']], [], '', false);
const queryGetUserInfoU = generateQuery(['match'], ['user'], [['username']], [], '', false);
const queryGetUserInfoE = generateQuery(['match'], ['user'], [['email']], [], '', false);

const queryUpdateToken = `${generateQuery(['match'], ['user'], [['username']], ['token'], '', false)}.Token`;
const queryUpdateUserPictures = generateQuery(['match'], ['user'], [['username']], ['pictures'], '', false);
const queryUpdateUserInfo = generateQuery(['match'], ['user'], [['token']], ['username', 'email', 'active'], '', false);;
const queryUpdateUserData = generateQuery(['match'], ['user'], [['token']], ['age', 'gender', 'sexo', 'bio', 'interests', 'location', 'latitude', 'longitude', 'valid'], '', false);;
const queryUpdatePassword = generateQuery(['match'], ['user'], [['token']], ['password'], '', false);
const queryUpdateUserNotification = generateQuery(['match'], ['user'], [['token']], ['notifications'], '', false);
const queryUpdateUsernameNotification = generateQuery(['match'], ['user'], [['username']], ['notifications'], '', false);

const queryCreateRelationship = generateQuery(['match', 'create'], ['user', 'user'], [['token'], ['username']], ['action'], '', false);
const queryGetRelationship = generateQuery(['match'], ['user', 'action', 'user'], [['token'], [], ['username']], [], '', false);
const queryUpdateRelationship = generateQuery(['match', 'set'], ['user', 'action', 'user'], [['token'], [], ['username']], ['match', 'block', 'like'], '', false);
const queryGetMatchedRelationship = generateQuery(['match'], ['user', 'action', 'user'], [['token'], [], []], [], '', false);

const querySearch = generateQuery(['match', 'where'], ['user'], [[]], [], 'a.Age => $ageGap[0] AND a.Age <= $ageGap[1]', false);

const queryCreateChatRoom = generateQuery(['match', 'create'], ['user', 'user'], [['token'], ['username']], [], 'chatroom', false);
const queryGetChatRoom = generateQuery(['match'], ['user', 'chat', 'chatroom', 'chat', 'user'], [['token'], ['username']], [], 'chatroom', false);
const queryUpdateChatRoom = generateQuery(['match', 'set'], ['user', 'chat', 'chatroom', 'chat', 'user'], [['token'], ['username']], ['messages'], 'chatroom', false);

export const runQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options))?.records.map(p => p.get(0));

export const createUser = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryCreateUser, options, session).catch(callback);
export const getUserMatchCount = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryMatchingUser, options, session).catch(callback);
export const getUserEmailCount = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryMatchingEmail, options, session).catch(callback)
export const getUserPassword = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryMatchingPassword, options, session).catch(callback);

export const getUserInfoT = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoT, options, session).catch(callback);
export const getUserInfoU = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoU, options, session).catch(callback);
export const getUserInfoE = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoE, options, session).catch(callback);

export const updateToken = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateToken, options, session).catch(callback);
export const updateUserPictures = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserPictures, options, session).catch(callback);
export const updateUserInfo = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserInfo, options, session).catch(callback);
export const updateUserData = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserData, options, session).catch(callback);
export const updatePassword = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdatePassword, options, session).catch(callback);
export const updateUserNotification = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserNotification, options, session).catch(callback);
export const updateUsernameNotification = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUsernameNotification, options, session).catch(callback);

export const createRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryCreateRelationship, options, session).catch(callback);
export const getRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryGetRelationship, options, session).catch(callback);
export const updateRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryUpdateRelationship, options, session).catch(callback);
export const getMatchedRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryGetMatchedRelationship, options, session).catch(callback);

export const getSearchResult = async (options: Filter, session: Session, callback: any) => await runQuery(querySearch, options, session).catch(callback);

export const createChatRoom = async (options: ChatRoom, session: Session, callback: any) => await runQuery(queryCreateChatRoom, options, session).catch(callback);
export const updateChatRoom = async (options: ChatRoom, session: Session, callback: any) => await runQuery(queryUpdateChatRoom, options, session).catch(callback);
export const getChatRoom = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetChatRoom, options, session).catch(callback);