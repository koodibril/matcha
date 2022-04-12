import { Session } from 'neo4j-driver';
import { User } from './user.d';
import { generateParams } from '../../../shared/utils';

export const updateUser = async (session: Session, userData: User, token: string, error: any) => {
    const result = await session.run('\
        MATCH (n: `user`)\
        WHERE n.Token = ' + token + '\
        SET ' + generateParams(Object.keys(userData), 'n', true) + '})', userData).catch(e => error(e));
    console.log(result.records._fields);
    return result.records;
};