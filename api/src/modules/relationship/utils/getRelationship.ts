import { Session } from 'neo4j-driver';

export const getRelationships = async (session: Session, token: string, username: string) => {
    const result = await session.run(
        "MATCH (n: `user`{Token: $token})-[r]-(m:`user`{Username: $username}) "+
        "RETURN r", { token: token, username: username });
    return result.records.map((p: any) => p.get(0));
};