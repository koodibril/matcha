import { Session } from 'neo4j-driver';
import { User } from './user.d';
import { generateParams } from '../../../shared/utils';

export const createUser = async (session: Session, userData: User, error: any) => {
    const result = await session.run(
        "CREATE (n: `user` { " + generateParams(Object.keys(userData), 'n', false) + "})", userData).catch(e => error(e));
    return result.records.map((p: any) => p.get(0));
};