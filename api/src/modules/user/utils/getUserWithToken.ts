import { Session } from 'neo4j-driver';

export const getUserWithToken = async (session: Session, token: string, error: any) => {
    const result = await session.run('\
        MATCH (n: `user`)\
        WHERE n.token = ' + token + '\
        RETURN n').catch(e => error(e));
    console.log(result.records);
    return result.records;
};