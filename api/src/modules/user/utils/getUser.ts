import { Session } from 'neo4j-driver';
import { generateParams } from '../../../shared/utils';
import { User } from './user';

export const getUser = async (session: Session, userData: User, error: any) => {
    const result = await session.run('\
        MATCH (n: `user`{ ' + generateParams(Object.keys(userData), '', false) + '})\
        RETURN n').catch(e => error(e));
    console.log(result.records);
    return result.records;
};