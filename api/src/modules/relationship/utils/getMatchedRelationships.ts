import { Session } from 'neo4j-driver';

export const getMatchedRelationships = async (session: Session, token: string, error: any) => {
    const result = await session.run(
        "MATCH (n: `user`{Token: \"" + token + "\"})-[r]-(m:`user`)" +
        "WHERE r.like = true AND r.block = false " +
        "RETURN r").catch(e => error(e));
    return result.records.map((p: any) => p.get(0));
};