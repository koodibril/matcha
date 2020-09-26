import { Session } from 'neo4j-driver';

interface UserOptions {
  username?: string;
  password?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  token?: string;
}

const toUpper = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
const generateParams = (params: (string)[]) => params.map(p => `${toUpper(p)}: $${p.toLowerCase()}`);
const generateQuery: any = (action: string, model: string, params: (string)[], getCount: boolean) => `${action.toUpperCase()} (a: ${`${toUpper(model)}`} { ${generateParams(params)} }) RETURN ${getCount ? 'COUNT(a)' : 'a'}`;
const queryMatchingUser = generateQuery('match', 'user', ['username'], true);
const queryMatchingEmail = generateQuery('match', 'user', ['email'], true);
const queryMatchingPassword = `${generateQuery('match', 'user', ['username'], false)}.password`;
const queryCreateUser = generateQuery('create', 'user', ['username', 'firstname', 'lastname', 'password', 'email', 'token'], false);

export const runQuery = async (query: string, options: UserOptions, session: Session) => await (await session.run(query, options)).records[0].get(0);
export const getUserMatchCount = async (options: UserOptions, session: Session) => (await runQuery(queryMatchingUser, options, session) as number);
export const getUserEmailCount = async (options: UserOptions, session: Session) => (await runQuery(queryMatchingEmail, options, session) as number)
export const getUserPassword = async (options: UserOptions, session: Session) => (await runQuery(queryMatchingPassword, options, session) as string);
export const createUser = async (options: UserOptions, session: Session, callback: any) => await session.run(queryCreateUser, options).catch(callback);