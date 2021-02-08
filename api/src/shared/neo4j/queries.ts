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

const toUpper = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
const generateParams = (params: (string)[]) => params.map(p => `${toUpper(p)}: $${p.toLowerCase()}`);
const generateUpdateParams = (params: (string)[]) => params.map(p => ` a.${toUpper(p)} = $${p.toLowerCase()}`);
const generateQuery: any = (action: string, model: string, params: (string)[], getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`} { ${generateParams(params)} }) RETURN ${getCount ? 'COUNT(a)' : 'a'}`;
const generateUpdateQuery: any = (action: string, model: string, params: (string)[], updateParams: (string)[], value: string, getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`} { ${generateParams(params)} }) SET ${generateUpdateParams(updateParams)} RETURN ${getCount ? 'COUNT(a)' : 'a'}`;
const queryMatchingUser = generateQuery('match', 'user', ['username'], true);
const queryMatchingEmail = generateQuery('match', 'user', ['email'], true);
const queryMatchingPassword = `${generateQuery('match', 'user', ['username'], false)}.Password`;
const queryCreateUser = generateQuery('create', 'user', ['username', 'password', 'email', 'active', 'valid', 'token', 'pictures'], false);
const queryGetUserInfoT = generateQuery('match', 'user', ['token'], false);
const queryGetUserInfoU = generateQuery('match', 'user', ['username'], false);
const queryupdateToken = `${generateUpdateQuery('match', 'user', ['username'], ['token'], false)}.Token`;
const queryupdateUserPictures = generateUpdateQuery('match', 'user', ['username'], ['pictures'], false);
const queryUpdateUserInfo = generateUpdateQuery('match', 'user', ['token'], ['username', 'email', 'active'], false);;
const queryUpdateUserData = generateUpdateQuery('match', 'user', ['token'], ['age', 'gender', 'sexo', 'bio', 'interests', 'valid'], false);;
const queryUpdatePassword = generateUpdateQuery('match', 'user', ['token'], ['password'], false);

export const runQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options))?.records[0]?.get(0);
export const getUserMatchCount = async (options: UserOptions, session: Session) => (await runQuery(queryMatchingUser, options, session) as number);
export const getUserEmailCount = async (options: UserOptions, session: Session) => (await runQuery(queryMatchingEmail, options, session) as number)
export const getUserPassword = async (options: UserOptions, session: Session) => (await runQuery(queryMatchingPassword, options, session) as string);
export const createUser = async (options: UserOptions, session: Session, callback: any) => await session.run(queryCreateUser, options).catch(callback);
export const getUserInfoT = async (options: UserOptions, session: Session) => (await runQuery(queryGetUserInfoT, options, session) as string);
export const getUserInfoU = async (options: UserOptions, session: Session) => (await runQuery(queryGetUserInfoU, options, session) as string);
export const updateToken = async (options: UserOptions, session: Session) => (await runQuery(queryupdateToken, options, session) as string);
export const updateUserPictures = async (options: UserOptions, session: Session) => (await runQuery(queryupdateUserPictures, options, session) as string);
export const updateUserInfo = async (options: UserOptions, session: Session) => (await runQuery(queryUpdateUserInfo, options, session) as string);
export const updateUserData = async (options: UserOptions, session: Session) => (await runQuery(queryUpdateUserData, options, session) as string);
export const updatePassword = async (options: UserOptions, session: Session) => (await runQuery(queryUpdatePassword, options, session) as string);