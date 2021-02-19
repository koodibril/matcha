import { Session } from 'neo4j-driver';

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
const generateQuery: any = (action: string, model: string, params: (string)[], getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`} { ${generateParams(params)} }) RETURN ${getCount ? 'COUNT(a)' : 'a'}`;
const generateUpdateQuery: any = (action: string, model: string, params: (string)[], updateParams: (string)[], value: string, getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`} { ${generateParams(params)} }) SET ${generateUpdateParams(updateParams)} RETURN ${getCount ? 'COUNT(a)' : 'a'}`;
const generateSearchQuery: any = (ageGap: number[], proximity: number, popularity: number[], interests: string[]) => `MATCH (n:User) WHERE n.Age <= $ageGap[1] AND n.Age >= $ageGap[0] AND n.Valid = true RETURN n LIMIT 5`;

const generateGetChatRoomQuery: any = (nodes: string[], params: string[]) => `MATCH (a:${toUpper(nodes[0])}{${toUpper(params[0])}: $${params[0].toLowerCase()}})<-[r1:CHAT]->(b: Chatroom)<-[r2:CHAT]->(c:${toUpper(nodes[1])}{${toUpper(params[1])}: $${params[1].toLowerCase()}}) RETURN b`;
const generateCreateChatRoomQuery: any = (nodes: string[], params: string[]) => `MATCH (a:${toUpper(nodes[0])}{${toUpper(params[0])}: $${params[0].toLowerCase()}}), (b:${toUpper(nodes[1])}{${toUpper(params[1])}: $${params[1].toLowerCase()}}) CREATE (a)-[r1:CHAT]->(c: Chatroom)-[r2:CHAT]->(b) RETURN c`;
const generateUpdateChatRoomQuery: any = (action: string, model: string, identity: number, messages: [], getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`}) WHERE id(a)=$identity SET a.Messages = $messages RETURN ${getCount ? 'COUNT(a)' : 'a'}`;


const queryMatchingUser = generateQuery('match', 'user', ['username'], true);
const queryMatchingEmail = generateQuery('match', 'user', ['email'], true);
const queryMatchingPassword = `${generateQuery('match', 'user', ['username'], false)}.Password`;

const queryCreateUser = generateQuery('create', 'user', ['username', 'password', 'email', 'active', 'valid', 'token', 'pictures'], false);
const queryGetUserInfoT = generateQuery('match', 'user', ['token'], false);
const queryGetUserInfoU = generateQuery('match', 'user', ['username'], false);
const queryGetUserInfoE = generateQuery('match', 'user', ['email'], false);

const queryupdateToken = `${generateUpdateQuery('match', 'user', ['username'], ['token'], false)}.Token`;
const queryupdateUserPictures = generateUpdateQuery('match', 'user', ['username'], ['pictures'], false);
const queryUpdateUserInfo = generateUpdateQuery('match', 'user', ['token'], ['username', 'email', 'active'], false);;
const queryUpdateUserData = generateUpdateQuery('match', 'user', ['token'], ['age', 'gender', 'sexo', 'bio', 'interests', 'location', 'latitude', 'longitude', 'valid'], false);;
const queryUpdatePassword = generateUpdateQuery('match', 'user', ['token'], ['password'], false);
const queryUpdateUserNotification = generateUpdateQuery('match', 'user', ['token'], ['notifications'], false);
const queryUpdateUsernameNotification = generateUpdateQuery('match', 'user', ['username'], ['notifications'], false);


const queryCreateRelationship = generateRelationshipQuery('create', ['user', 'user'], ['token', 'username'], ['match', 'block', 'like']);
const queryGetRelationship = generateGetRelationshipQuery(['user', 'user'], ['token', 'username']);
const queryGetReverseRelationship = generateGetReverseRelationshipQuery(['user', 'user'], ['token', 'username']);
const queryUpdateRelationship = generateUpdateRelationshipQuery('set', ['user', 'user'], ['token', 'username'], ['match', 'block', 'like']);
const queryGetMatchedRelationship = generateGetMatchedRelationshipQuery(['user', 'user'], ['token']);

const queryCreateChatRoom = generateCreateChatRoomQuery(['user', 'user'], ['token', 'username'], false);
const queryUpdateChatRoom = generateUpdateChatRoomQuery('match', 'chatroom', 'identity', 'messages', false);
const queryGetChatRoom = generateGetChatRoomQuery(['user', 'user'], ['token', 'username'], false);

const querySearch = generateSearchQuery('ageGap', 'proximity', 'popularity', 'interests');

export const runQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options))?.records[0]?.get(0);
export const runChatQuery = async (query: string, options: ChatRoom, session: Session) => await (await session.run(query, options))?.records[0]?.get(0);
export const runSearchQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options))?.records.map(p => p.get(0));
export const getUserMatchCount = async (options: UserOptions, session: Session) => (await runQuery(queryMatchingUser, options, session) as number);
export const getUserEmailCount = async (options: UserOptions, session: Session) => (await runQuery(queryMatchingEmail, options, session) as number)
export const getUserPassword = async (options: UserOptions, session: Session) => (await runQuery(queryMatchingPassword, options, session) as string);
export const createUser = async (options: UserOptions, session: Session, callback: any) => await session.run(queryCreateUser, options).catch(callback);
export const getUserInfoT = async (options: UserOptions, session: Session) => (await runQuery(queryGetUserInfoT, options, session) as string);
export const getUserInfoU = async (options: UserOptions, session: Session) => (await runQuery(queryGetUserInfoU, options, session) as string);
export const getUserInfoE = async (options: UserOptions, session: Session) => (await runQuery(queryGetUserInfoE, options, session) as string);
export const updateToken = async (options: UserOptions, session: Session) => (await runQuery(queryupdateToken, options, session) as string);
export const updateUserPictures = async (options: UserOptions, session: Session) => (await runQuery(queryupdateUserPictures, options, session) as string);
export const updateUserInfo = async (options: UserOptions, session: Session) => (await runQuery(queryUpdateUserInfo, options, session) as string);
export const updateUserData = async (options: UserOptions, session: Session) => (await runQuery(queryUpdateUserData, options, session) as string);
export const updateUserNotification = async (options: UserOptions, session: Session) => (await runQuery(queryUpdateUserNotification, options, session) as string);
export const updateUsernameNotification = async (options: UserOptions, session: Session) => (await runQuery(queryUpdateUsernameNotification, options, session) as string);
export const updatePassword = async (options: UserOptions, session: Session) => (await runQuery(queryUpdatePassword, options, session) as string);
export const createRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryCreateRelationship, options, session) as string);
export const getRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryGetRelationship, options, session) as string);
export const getReverseRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryGetReverseRelationship, options, session) as string);
export const updateRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryUpdateRelationship, options, session) as string);
export const getSearchResult = async (options: Filter, session: Session) => (await runSearchQuery(querySearch, options, session));
export const getMatchedRelationship = async (options: RelationshipOptions, session: Session) => (await runSearchQuery(queryGetMatchedRelationship, options, session));
export const createChatRoom = async (options: ChatRoom, session: Session) => (await runChatQuery(queryCreateChatRoom, options, session) as string);
export const getChatRoom = async (options: UserOptions, session: Session) => (await runChatQuery(queryGetChatRoom, options, session) as string);
export const updateChatRoom = async (options: ChatRoom, session: Session) => (await runChatQuery(queryUpdateChatRoom, options, session) as string);
