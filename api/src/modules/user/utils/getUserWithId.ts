import { Session } from 'neo4j-driver';

export const getUserWithId = async (session: Session, id: number, error: any) => {
    const result = await session.run('\
        MATCH (n: `user`)\
        WHERE Id(n) = ' + id + '\
        RETURN n').catch(e => error(e));
    console.log(result.records);
    return result.records;
};