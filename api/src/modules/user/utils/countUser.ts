import { Session } from 'neo4j-driver';
import { generateParams } from '../../../shared/utils';
import { User } from './user';

export const countUsers = async (session: Session, user: User, error: any) => {
    const result = await session.run('\
        MATCH (n: `user`)\
        WHERE ' + generateParams(Object.keys(user), 'n', true) + '\
        RETURN count(n)').catch(e => error(e));
    console.log(result.records);
    return result.records;
};