import { Session } from 'neo4j-driver';

export const getUserWithUsername = async (session: Session, username: string, error: any) => {
    const result = await session.run('\
        MATCH (n: `user`)\
        WHERE n.Username = ' + username + '\
        RETURN n').catch(e => error(e));
    console.log(result.records);
    return result.records;
};