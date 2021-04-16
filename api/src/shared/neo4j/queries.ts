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
  identity?: number;
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

const queryCreateUser = generateQuery(['create'], ['user'], [['username', 'password', 'email', 'active', 'valid', 'token', 'pictures']], [], '', 'a', false);
const queryMatchingUser = generateQuery(['match'], ['user'], [['username']], [], '', 'a', true);
const queryMatchingEmail = generateQuery(['match'], ['user'], [['email']], [], '', 'a', true);
const queryMatchingPassword = `${generateQuery(['match'], ['user'], [['username']], [], '', 'a', false)}.Password`;

const queryGetUserInfoT = generateQuery(['match'], ['user'], [['token']], [], '', 'a', false);
const queryGetUserInfoU = generateQuery(['match'], ['user'], [['username']], [], '', 'a', false);
const queryGetUserInfoE = generateQuery(['match'], ['user'], [['email']], [], '', 'a', false);

const queryUpdateToken = `${generateQuery(['match', 'set'], ['user'], [['username']], ['token'], '', 'a', false)}.Token`;
const queryUpdateUserPictures = generateQuery(['match', 'set'], ['user'], [['username']], ['pictures'], '', 'a', false);
const queryUpdateUserInfo = generateQuery(['match', 'set'], ['user'], [['token']], ['username', 'email', 'active'], '', 'a', false);;
const queryUpdateUserData = generateQuery(['match', 'set'], ['user'], [['token']], ['age', 'gender', 'sexo', 'bio', 'interests', 'location', 'latitude', 'longitude', 'valid'], '', 'a', false);;
const queryUpdatePassword = generateQuery(['match', 'set'], ['user'], [['token']], ['password'], '', 'a', false);
const queryUpdateEmail = generateQuery(['match', 'set'], ['user'], [['token']], ['email'], '', 'a', false);
const queryUpdateUsername = generateQuery(['match', 'set'], ['user'], [['token']], ['username'], '', 'a', false);
const queryUpdateUserNotification = generateQuery(['match', 'set'], ['user'], [['token']], ['notifications'], '', 'a', false);
const queryUpdateUsernameNotification = generateQuery(['match', 'set'], ['user'], [['username']], ['notifications'], '', 'a', false);

const queryCreateRelationship = generateQuery(['match', 'create'], ['user', 'user'], [['token'], ['username']], ['action'], '', 'r', false);
const queryGetRelationship = generateQuery(['match'], ['user', 'action', 'user'], [['token'], [], ['username']], [], '', 'r', false);
const queryUpdateRelationship = generateQuery(['match', 'where', 'set'], ['user', 'action', 'user'], [['token'], [], ['username']], ['match', 'block', 'like'], '(a)-[r]->(b)', 'r', false);
const queryGetMatchedRelationship = generateQuery(['match', 'where'], ['user', 'action', 'user'], [['token'], [], []], [], 'r.Match = true', 'b', false);

const querySearch = generateQuery(['match', 'where'], ['user'], [[]], [], 'a.Age >= $ageGap[0] AND a.Age <= $ageGap[1]', 'a', false);

const queryCreateChatRoom = generateQuery(['match', 'create'], ['user', 'user'], [['token'], ['username']], [], 'chatroom', 'c', false);
const queryGetChatRoom = generateQuery(['match'], ['user', 'chat', 'chatroom', 'chat', 'user'], [['token'], ['username']], [], 'chatroom', 'c', false);
const queryUpdateChatRoom = generateQuery(['match', 'set'], ['user', 'chat', 'chatroom', 'chat', 'user'], [['token'], ['username']], ['messages'], 'chatroom', 'c', false);

export const runQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options)).records.map(p => p.get(0));

export const createUser = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryCreateUser, options, session).catch(callback);
export const getUserMatchCount = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryMatchingUser, options, session).catch(callback);
export const getUserEmailCount = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryMatchingEmail, options, session).catch(callback);
export const getUserPassword = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryMatchingPassword, options, session).catch(callback);

export const getUserInfoT = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoT, options, session).catch(callback);
export const getUserInfoU = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoU, options, session).catch(callback);
export const getUserInfoE = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoE, options, session).catch(callback);

export const updateToken = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateToken, options, session).catch(callback);
export const updateUserPictures = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserPictures, options, session).catch(callback);
export const updateUserInfo = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserInfo, options, session).catch(callback);
export const updateUserData = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserData, options, session).catch(callback);
export const updatePassword = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdatePassword, options, session).catch(callback);
export const updateEmail = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateEmail, options, session).catch(callback);
export const updateUsername = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUsername, options, session).catch(callback);
export const updateUserNotification = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserNotification, options, session).catch(callback);
export const updateUsernameNotification = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUsernameNotification, options, session).catch(callback);

export const createRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryCreateRelationship, options, session).catch(callback);
export const getRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryGetRelationship, options, session).catch(callback);
export const updateRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryUpdateRelationship, options, session).catch(callback);
export const getMatchedRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryGetMatchedRelationship, options, session).catch(callback);

export const getSearchResult = async (options: Filter, session: Session, callback: any) => await runQuery(querySearch, options, session).catch(callback);

export const createChatRoom = async (options: ChatRoom, session: Session, callback: any) => await runQuery(queryCreateChatRoom, options, session).catch(callback);
export const getChatRoom = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetChatRoom, options, session).catch(callback);
export const updateChatRoom = async (options: ChatRoom, session: Session, callback: any) => await runQuery(queryUpdateChatRoom, options, session).catch(callback);