import { Session } from 'neo4j-driver';

export const getMatchedRelationships = async (session: Session, token: string, error: any) => {
    const result = await session.run(
        "MATCH (n: `user`{Token: \"" + token + "\"})-[r]-(m:`user`) " +
        "WHERE r.Match = true AND r.Block = False " +
        "RETURN DISTINCT m").catch(e => error(e));
    return result.records.map((p: any) => p.get(0));
};