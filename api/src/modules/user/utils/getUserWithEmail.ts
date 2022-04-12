import { Session } from 'neo4j-driver';

export const getUserWithEmail = async (session: Session, email: string, error: any) => {
    const result = await session.run('\
        MATCH (n: `user`)\
        WHERE n.email = ' + email + '\
        RETURN n').catch(e => error(e));
    console.log(result.records);
    return result.records;
};