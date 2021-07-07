import { Session } from 'neo4j-driver';
import { generateQuery } from './querieMaker';
interface UserOptions {
  id?: number;
  username?: string;
  surname?: string;
  name?: string;
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
  popularity?: number;
  agegap?: number[];
  proximity?: number;
  lfpopularity?: number[];
  lfinterests?: string[];
  location?: string;
  latitude?: number;
  longitude?: number;
  socket?: string;
  online?: number;
}

interface RelationshipOptions {
  token?: string;
  username?: string;
  match?: boolean;
  block?: boolean;
  like?: boolean;
  identity?: number;
}

interface ChatRoom {
  username?: string;
  token?: string;
  messages?: string[];
}

const queryCreateUser = generateQuery(['create'], ['user'], [['username', 'password', 'email', 'name', 'surname', 'active', 'valid', 'token', 'pictures']], [], '', 'a', false);
const queryMatchingUser = generateQuery(['match'], ['user'], [['username']], [], '', 'a', true);
const queryMatchingEmail = generateQuery(['match'], ['user'], [['email']], [], '', 'a', true);
const queryMatchingPassword = `${generateQuery(['match'], ['user'], [['username']], [], '', 'a', false)}.Password`;
const queryUserNumber = generateQuery(['match'], ['user'], [[]], [], '', 'a', true);

const queryGetUserInfoT = generateQuery(['match'], ['user'], [['token']], [], '', 'a', false);
const queryGetUserInfoU = generateQuery(['match'], ['user'], [['username']], [], '', 'a', false);
const queryGetUserInfoE = generateQuery(['match'], ['user'], [['email']], [], '', 'a', false);
const queryGetUserInfoI = generateQuery(['match', 'where'], ['user'], [[]], [], 'Id(a) = $id', 'a', false);
const queryGetUserInfoS = generateQuery(['match'], ['user'], [['socket']], [], '', 'a', false);

const queryUpdateToken = `${generateQuery(['match', 'set'], ['user'], [['username']], ['token'], '', 'a', false)}.Token`;
const queryUpdateSocket = `${generateQuery(['match', 'set'], ['user'], [['token']], ['socket'], '', 'a', false)}.Socket`;
const queryUpdateUserPictures = generateQuery(['match', 'set'], ['user'], [['username']], ['pictures'], '', 'a', false);
const queryUpdateUserInfo = generateQuery(['match', 'set'], ['user'], [['token']], ['username', 'email', 'active'], '', 'a', false);;
const queryUpdateUserFilter = generateQuery(['match', 'set'], ['user'], [['token']], ['ageGap', 'proximity', 'LFpopularity', 'LFinterests'], '', 'a', false);;
const queryUpdateUserData = generateQuery(['match', 'set'], ['user'], [['token']], ['age', 'gender', 'sexo', 'bio', 'interests', 'location', 'latitude', 'longitude', 'valid', 'popularity'], '', 'a', false);;
const queryUpdatePassword = generateQuery(['match', 'set'], ['user'], [['token']], ['password'], '', 'a', false);
const queryUpdateEmail = generateQuery(['match', 'set'], ['user'], [['token']], ['email'], '', 'a', false);
const queryUpdateOnline = generateQuery(['match', 'set'], ['user'], [['token']], ['online'], '', 'a', false);
const queryUpdateUsername = generateQuery(['match', 'set'], ['user'], [['token']], ['username'], '', 'a', false);
const queryUpdateSurname = generateQuery(['match', 'set'], ['user'], [['token']], ['surname'], '', 'a', false);
const queryUpdateName = generateQuery(['match', 'set'], ['user'], [['token']], ['name'], '', 'a', false);
const queryUpdateUserNotification = generateQuery(['match', 'set'], ['user'], [['token']], ['notifications'], '', 'a', false);
const queryUpdateUsernameNotification = generateQuery(['match', 'set'], ['user'], [['username']], ['notifications'], '', 'a', false);

const queryCreateRelationship = generateQuery(['match', 'create'], ['user', 'user'], [['token'], ['username']], ['action'], '', 'r', false);
const queryGetRelationship = generateQuery(['match'], ['user', 'action', 'user'], [['token'], [], ['username']], [], '', 'r', false);
const queryUpdateRelationship = generateQuery(['match', 'where', 'set'], ['user', 'action', 'user'], [['token'], [], ['username']], ['match', 'block', 'like'], '(a)-[r]->(b)', 'r', false);
const queryGetMatchedRelationship = generateQuery(['match', 'where'], ['user', 'action', 'user'], [['token'], [], []], [], 'r.Match = true', 'DISTINCT b', false);

const querySearch = generateQuery(['match', 'where'], ['user'], [[]], [], 
'a.Valid = true ' + 
'AND a.Age >= $agegap[0] AND a.Age <= $agegap[1] ' +
'AND a.Popularity >= $popularity[0] AND a.Popularity <= $popularity[1] ' + 
'AND a.Token <> $token '
, 'a ORDER BY (6371e3 * (2 * atan2(sqrt(sin(((a.Latitude-$latitude) * pi()/180)/2) * sin(((a.Latitude-$latitude) * pi()/180)/2) + cos(($latitude * pi()/180)) * cos((a.Latitude * pi()/180)) * sin(((a.Longitude-$longitude) * pi()/180)/2) * sin(((a.Longitude-$longitude) * pi()/180)/2)), sqrt(1-(sin(((a.Latitude-$latitude) * pi()/180)/2) * sin(((a.Latitude-$latitude) * pi()/180)/2) + cos(($latitude * pi()/180)) * cos((a.Latitude * pi()/180)) * sin(((a.Longitude-$longitude) * pi()/180)/2) * sin(((a.Longitude-$longitude) * pi()/180)/2)))))), size(a.Interests) DESC, a.Popularity DESC', false);

//6371e3 * (2 * atan2(sqrt(sin(((a.Latitude-$latitude) * pi()/180)/2) * sin(((a.Latitude-$latitude) * pi()/180)/2) + cos(($latitude * pi()/180)) * cos((a.Latitude * pi()/180)) * sin(((a.Longitude-$longitude) * pi()/180)/2) * sin(((a.Longitude-$longitude) * pi()/180)/2)), sqrt(1-(sin(((a.Latitude-$latitude) * pi()/180)/2) * sin(((a.Latitude-$latitude) * pi()/180)/2) + cos(($latitude * pi()/180)) * cos((a.Latitude * pi()/180)) * sin(((a.Longitude-$longitude) * pi()/180)/2) * sin(((a.Longitude-$longitude) * pi()/180)/2)))));

const queryCreateChatRoom = generateQuery(['match', 'create'], ['user', 'user'], [['token'], ['username']], [], 'chatroom', 'c', false);
const queryGetChatRoom = generateQuery(['match'], ['user', 'chat', 'chatroom', 'chat', 'user'], [['token'], ['username']], [], 'chatroom', 'c', false);
const queryUpdateChatRoom = generateQuery(['match', 'set'], ['user', 'chat', 'chatroom', 'chat', 'user'], [['token'], ['username']], ['messages'], 'chatroom', 'c', false);

export const runQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options)).records.map(p => p.get(0));

export const createUser = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryCreateUser, options, session).catch(callback);
export const getUserMatchCount = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryMatchingUser, options, session).catch(callback);
export const getUserEmailCount = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryMatchingEmail, options, session).catch(callback);
export const getUserPassword = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryMatchingPassword, options, session).catch(callback);
export const getUserNumber = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUserNumber, options, session).catch(callback);

export const getUserInfoT = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoT, options, session).catch(callback);
export const getUserInfoU = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoU, options, session).catch(callback);
export const getUserInfoE = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoE, options, session).catch(callback);
export const getUserInfoI = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoI, options, session).catch(callback);
export const getUserInfoS = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetUserInfoS, options, session).catch(callback);

export const updateToken = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateToken, options, session).catch(callback);
export const updateSocket = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateSocket, options, session).catch(callback);
export const updateUserPictures = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserPictures, options, session).catch(callback);
export const updateUserInfo = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserInfo, options, session).catch(callback);
export const updateUserFilter = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserFilter, options, session).catch(callback);
export const updateUserData = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserData, options, session).catch(callback);
export const updatePassword = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdatePassword, options, session).catch(callback);
export const updateEmail = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateEmail, options, session).catch(callback);
export const updateOnline = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateOnline, options, session).catch(callback);
export const updateUsername = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUsername, options, session).catch(callback);
export const updateSurname = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateSurname, options, session).catch(callback);
export const updateName = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateName, options, session).catch(callback);
export const updateUserNotification = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUserNotification, options, session).catch(callback);
export const updateUsernameNotification = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryUpdateUsernameNotification, options, session).catch(callback);

export const createRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryCreateRelationship, options, session).catch(callback);
export const getRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryGetRelationship, options, session).catch(callback);
export const updateRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryUpdateRelationship, options, session).catch(callback);
export const getMatchedRelationship = async (options: RelationshipOptions, session: Session, callback: any) => await runQuery(queryGetMatchedRelationship, options, session).catch(callback);

export const getSearchResult = async (options: UserOptions, session: Session, callback: any) => await runQuery(querySearch, options, session).catch(callback);

export const createChatRoom = async (options: ChatRoom, session: Session, callback: any) => await runQuery(queryCreateChatRoom, options, session).catch(callback);
export const getChatRoom = async (options: UserOptions, session: Session, callback: any) => await runQuery(queryGetChatRoom, options, session).catch(callback);
export const updateChatRoom = async (options: ChatRoom, session: Session, callback: any) => await runQuery(queryUpdateChatRoom, options, session).catch(callback);