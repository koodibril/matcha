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
  active?: boolean;
  valid?: boolean;
  token?: string;
}

interface RelationshipOptions {
  token?: string,
  username?: string,
  match?: boolean,
  block?: boolean,
  like?: boolean
}

interface Filter {
  ageGap?: number[];
  proximity?: number;
  popularity?: number[];
  interests?: string[];
}



const toUpper = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
const generateParams = (params: (string)[]) => params.map(p => `${toUpper(p)}: $${p.toLowerCase()}`);
const generateRelationshipActionParams = (relationshipParams: (string)[]) => '[r:ACTION { ' + generateParams(relationshipParams) + '}]';
const generateUpdateParams = (params: (string)[]) => params.map(p => ` a.${toUpper(p)} = $${p.toLowerCase()}`);
const generateRelationshipUpdateParams = (params: (string)[]) => params.map(p => ` r.${toUpper(p)} = $${p.toLowerCase()}`);
const generateRelationshipQuery: any = (action: string, nodes: string[], params: string[], relationshipParams: string[]) => `MATCH (a:${toUpper(nodes[0])}), (b:${toUpper(nodes[1])}) WHERE a.${toUpper(params[0])} = $${params[0].toLowerCase()} AND b.${toUpper(params[1])} = $${params[1].toLowerCase()} ${action.toUpperCase()} (a)-${generateRelationshipActionParams(relationshipParams)}->(b) RETURN r`;
const generateGetRelationshipQuery: any = (nodes: string[], params: string[]) => `MATCH (a:${toUpper(nodes[0])}{${toUpper(params[0])}: $${params[0].toLowerCase()}})-[r]->(b:${toUpper(nodes[1])}{${toUpper(params[1])}: $${params[1].toLowerCase()}}) RETURN r`;
const generateUpdateRelationshipQuery: any = (action: string, nodes: string[], params: string[], relationshipParams: string[]) => `MATCH (a:${toUpper(nodes[0])}{${toUpper(params[0])}: $${params[0].toLowerCase()}})-[r]->(b:${toUpper(nodes[1])}{${toUpper(params[1])}: $${params[1].toLowerCase()}}) ${action.toUpperCase()} ${generateRelationshipUpdateParams(relationshipParams)} RETURN r`;
const generateQuery: any = (action: string, model: string, params: (string)[], getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`} { ${generateParams(params)} }) RETURN ${getCount ? 'COUNT(a)' : 'a'}`;
const generateUpdateQuery: any = (action: string, model: string, params: (string)[], updateParams: (string)[], value: string, getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`} { ${generateParams(params)} }) SET ${generateUpdateParams(updateParams)} RETURN ${getCount ? 'COUNT(a)' : 'a'}`;
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
const queryUpdateUserData = generateUpdateQuery('match', 'user', ['token'], ['age', 'gender', 'sexo', 'bio', 'interests', 'valid'], false);;
const queryUpdatePassword = generateUpdateQuery('match', 'user', ['token'], ['password'], false);
const queryCreateRelationship = generateRelationshipQuery('create', ['user', 'user'], ['token', 'username'], ['match', 'block', 'like']);
const queryGetRelationship = generateGetRelationshipQuery(['user', 'user'], ['token', 'username']);
const queryUpdateRelationship = generateUpdateRelationshipQuery('set', ['user', 'user'], ['token', 'username'], ['match', 'block', 'like']);

const generateSearchQuery: any = (ageGap: number[]) => `MATCH (n:User) WHERE n.age <= $ageGap[0] AND n.age >= $ageGap[1] RETURN n`;
const querySearch = generateSearchQuery('ageGap');

export const runQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options))?.records[0]?.get(0);
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
export const updatePassword = async (options: UserOptions, session: Session) => (await runQuery(queryUpdatePassword, options, session) as string);
export const createRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryCreateRelationship, options, session) as string);
export const getRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryGetRelationship, options, session) as string);
export const updateRelationship = async (options: RelationshipOptions, session: Session) => (await runQuery(queryUpdateRelationship, options, session) as string);
export const getSearchResult = async (options: Filter, session: Session) => (await runQuery(querySearch, options, session) as string);;