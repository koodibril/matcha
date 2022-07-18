import { Session } from 'neo4j-driver';

export const getRelationships = async (session: Session, token: string, username: string, error: any) => {
    const result = await session.run(
        "MATCH (n: `user`{Token: \"" + token + "\"})-[r]-(m:`user`{Username: \"" + username + "\"}) "+
        "RETURN r").catch(e => error(e));
    return result.records.map((p: any) => p.get(0));
};