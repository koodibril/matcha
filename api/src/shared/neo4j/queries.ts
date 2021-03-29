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
  identity?: number;
  username?: string;
  token?: string;
  messages?: string[];
}



const toUpper = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
const generateParams = (params: (string)[]) => params.map(p => `${toUpper(p)}: $${p.toLowerCase()}`);
const generateRelationshipActionParams = (relationshipParams: (string)[]) => '[r:ACTION { ' + generateParams(relationshipParams) + '}]';
const generateUpdateParams = (params: (string)[]) => params.map(p => ` a.${toUpper(p)} = $${p.toLowerCase()}`);
const generateRelationshipUpdateParams = (params: (string)[]) => params.map(p => ` r.${toUpper(p)} = $${p.toLowerCase()}`);

const generateRelationshipQuery: any = (action: string, nodes: string[], params: string[], relationshipParams: string[]) => `MATCH (a:${toUpper(nodes[0])}), (b:${toUpper(nodes[1])}) WHERE a.${toUpper(params[0])} = $${params[0].toLowerCase()} AND b.${toUpper(params[1])} = $${params[1].toLowerCase()} ${action.toUpperCase()} (a)-${generateRelationshipActionParams(relationshipParams)}->(b) RETURN r`;
const generateGetRelationshipQuery: any = (nodes: string[], params: string[]) => `MATCH (a:${toUpper(nodes[0])}{${toUpper(params[0])}: $${params[0].toLowerCase()}})-[r]->(b:${toUpper(nodes[1])}{${toUpper(params[1])}: $${params[1].toLowerCase()}}) RETURN r`;
const generateGetReverseRelationshipQuery: any = (nodes: string[], params: string[]) => `MATCH (a:${toUpper(nodes[0])}{${toUpper(params[0])}: $${params[0].toLowerCase()}})<-[r]-(b:${toUpper(nodes[1])}{${toUpper(params[1])}: $${params[1].toLowerCase()}}) RETURN r`;
const generateGetMatchedRelationshipQuery: any = (nodes: string[], params: string[]) => `MATCH (a:${toUpper(nodes[0])}{${toUpper(params[0])}: $${params[0].toLowerCase()}})<-[r]->(b:${toUpper(nodes[1])}) WHERE r.Match = true RETURN b`;
const generateUpdateRelationshipQuery: any = (action: string, nodes: string[], params: string[], relationshipParams: string[]) => `MATCH (a:${toUpper(nodes[0])}{${toUpper(params[0])}: $${params[0].toLowerCase()}})-[r]->(b:${toUpper(nodes[1])}{${toUpper(params[1])}: $${params[1].toLowerCase()}}) ${action.toUpperCase()} ${generateRelationshipUpdateParams(relationshipParams)} RETURN r`;
const generateOldQuery: any = (action: string, model: string, params: (string)[], getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`} { ${generateParams(params)} }) RETURN ${getCount ? 'COUNT(a)' : 'a'}`;
const generateUpdateQuery: any = (action: string, model: string, params: (string)[], updateParams: (string)[], value: string, getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`} { ${generateParams(params)} }) SET ${generateUpdateParams(updateParams)} RETURN ${getCount ? 'COUNT(a)' : 'a'}`;
const generateSearchQuery: any = (ageGap: number[], proximity: number, popularity: number[], interests: string[]) => `MATCH (n:User) WHERE n.Age <= $ageGap[1] AND n.Age >= $ageGap[0] AND n.Valid = true RETURN n LIMIT 5`;

const generateGetChatRoomQuery: any = (nodes: string[], params: string[]) => `MATCH (a:${toUpper(nodes[0])}{${toUpper(params[0])}: $${params[0].toLowerCase()}})<-[r1:CHAT]->(b: Chatroom)<-[r2:CHAT]->(c:${toUpper(nodes[1])}{${toUpper(params[1])}: $${params[1].toLowerCase()}}) RETURN b`;
const generateCreateChatRoomQuery: any = (nodes: string[], params: string[]) => `MATCH (a:${toUpper(nodes[0])}{${toUpper(params[0])}: $${params[0].toLowerCase()}}), (b:${toUpper(nodes[1])}{${toUpper(params[1])}: $${params[1].toLowerCase()}}) CREATE (a)-[r1:CHAT]->(c: Chatroom)-[r2:CHAT]->(b) RETURN c`;
const generateUpdateChatRoomQuery: any = (action: string, model: string, identity: number, messages: [], getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`}) WHERE id(a)=$identity SET a.Messages = $messages RETURN ${getCount ? 'COUNT(a)' : 'a'}`;


const queryOldMatchingUser = generateOldQuery('match', 'user', ['username'], true);
const queryOldMatchingEmail = generateOldQuery('match', 'user', ['email'], true);
const queryOldMatchingPassword = `${generateOldQuery('match', 'user', ['username'], false)}.Password`;

const queryOldGetUserInfoT = generateOldQuery('match', 'user', ['token'], false);
const queryOldGetUserInfoU = generateOldQuery('match', 'user', ['username'], false);
const queryOldGetUserInfoE = generateOldQuery('match', 'user', ['email'], false);

const queryOldupdateToken = `${generateUpdateQuery('match', 'user', ['username'], ['token'], false)}.Token`;
const queryOldupdateUserPictures = generateUpdateQuery('match', 'user', ['username'], ['pictures'], false);
const queryOldUpdateUserInfo = generateUpdateQuery('match', 'user', ['token'], ['username', 'email', 'active'], false);;
const queryOldUpdateUserData = generateUpdateQuery('match', 'user', ['token'], ['age', 'gender', 'sexo', 'bio', 'interests', 'location', 'latitude', 'longitude', 'valid'], false);;
const queryOldUpdatePassword = generateUpdateQuery('match', 'user', ['token'], ['password'], false);
const queryOldUpdateUserNotification = generateUpdateQuery('match', 'user', ['token'], ['notifications'], false);
const queryOldUpdateUsernameNotification = generateUpdateQuery('match', 'user', ['username'], ['notifications'], false);


const queryOldCreateRelationship = generateRelationshipQuery('create', ['user', 'user'], ['token', 'username'], ['match', 'block', 'like']);
const queryOldGetRelationship = generateGetRelationshipQuery(['user', 'user'], ['token', 'username']);
const queryOldGetReverseRelationship = generateGetReverseRelationshipQuery(['user', 'user'], ['token', 'username']);
const queryOldUpdateRelationship = generateUpdateRelationshipQuery('set', ['user', 'user'], ['token', 'username'], ['match', 'block', 'like']);
const queryOldGetMatchedRelationship = generateGetMatchedRelationshipQuery(['user', 'user'], ['token']);

const queryOldCreateChatRoom = generateCreateChatRoomQuery(['user', 'user'], ['token', 'username'], false);
const queryOldUpdateChatRoom = generateUpdateChatRoomQuery('match', 'chatroom', 'identity', 'messages', false);
const queryOldGetChatRoom = generateGetChatRoomQuery(['user', 'user'], ['token', 'username'], false);

const queryOldSearch = generateSearchQuery('ageGap', 'proximity', 'popularity', 'interests');

export const runQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options))?.records[0]?.get(0);
export const runChatQuery = async (query: string, options: ChatRoom, session: Session) => await (await session.run(query, options))?.records[0]?.get(0);
export const runSearchQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options))?.records.map(p => p.get(0));
export const getUserInfoT = async (options: UserOptions, session: Session) => (await runQuery(queryOldGetUserInfoT, options, session) as string);
export const getUserInfoU = async (options: UserOptions, session: Session) => (await runQuery(queryOldGetUserInfoU, options, session) as string);
export const getUserInfoE = async (options: UserOptions, session: Session) => (await runQuery(queryOldGetUserInfoE, options, session) as string);
export const updateToken = async (options: UserOptions, session: Session) => (await runQuery(queryOldupdateToken, options, session) as string);
export const updateUserPictures = async (options: UserOptions, session: Session) => (await runQuery(queryOldupdateUserPictures, options, session) as string);
export const updateUserInfo = async (options: UserOptions, session: Session) => (await runQuery(queryOldUpdateUserInfo, options, session) as string);
export const updateUserData = async (options: UserOptions, session: Session) => (await runQuery(queryOldUpdateUserData, options, session) as string);
export const updateUserNotification = async (options: UserOptions, session: Session) => (await runQuery(queryOldUpdateUserNotification, options, session) as string);
export const updateUsernameNotification = async (options: UserOptions, session: Session) => (await runQuery(queryOldUpdateUsernameNotification, options, session) as string);
export const updatePassword = async (options: UserOptions, session: Session) => (await runQuery(queryOldUpdatePassword, options, session) as string);
export const createRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryOldCreateRelationship, options, session) as string);
export const getRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryOldGetRelationship, options, session) as string);
export const getReverseRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryOldGetReverseRelationship, options, session) as string);
export const updateRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryOldUpdateRelationship, options, session) as string);
export const getSearchResult = async (options: Filter, session: Session) => (await runSearchQuery(queryOldSearch, options, session));
export const getMatchedRelationship = async (options: RelationshipOptions, session: Session) => (await runSearchQuery(queryOldGetMatchedRelationship, options, session));
export const createChatRoom = async (options: ChatRoom, session: Session) => (await runChatQuery(queryOldCreateChatRoom, options, session) as string);
export const getChatRoom = async (options: UserOptions, session: Session) => (await runChatQuery(queryOldGetChatRoom, options, session) as string);
export const updateChatRoom = async (options: ChatRoom, session: Session) => (await runChatQuery(queryOldUpdateChatRoom, options, session) as string);

const queryCreateUser = generateQuery(['create'], ['user'], [['username', 'password', 'email', 'active', 'valid', 'token', 'pictures']], [], false);
export const runNewAwesomeQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options))?.records.map(p => p.get(0));
export const createUser = async (options: UserOptions, session: Session, callback: any) => await session.run(queryCreateUser, options).catch(callback);
export const getUserMatchCount = async (options: UserOptions, session: Session) => (await runQuery(queryOldMatchingUser, options, session) as number);
export const getUserEmailCount = async (options: UserOptions, session: Session) => (await runQuery(queryOldMatchingEmail, options, session) as number)
export const getUserPassword = async (options: UserOptions, session: Session) => (await runQuery(queryOldMatchingPassword, options, session) as string);
