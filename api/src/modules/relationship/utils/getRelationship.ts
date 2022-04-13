import { Session } from 'neo4j-driver';

export const getRelationships = async (session: Session, token: string, username: string, error: any) => {
    const result = await session.run('\
        MATCH (n: `user`{token: ' + token + '}-[r]-(m:`user`{username: ' + username + '}))\
        RETURN r').catch(e => error(e));
    console.log(result.records);
    return result.records;
};