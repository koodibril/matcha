import { Session } from 'neo4j-driver';

export const createChatRoom = async (session: Session, token: string, username: string) => {
    const result = await session.run(
        "MATCH (n: `user`), (p:`user`) " +
        "WHERE n.Token = $token AND p.Username = $username " +
        "CREATE (n)-[r1: `chat`]->(m: `chatroom`)<-[r2: `chat`]-(p) " +
        "RETURN m", { token: token, username: username });
        return result.records.map((p: any) => p.get(0));
};