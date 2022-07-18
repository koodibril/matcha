import { Session } from 'neo4j-driver';

export const getChatRoom = async (session: Session, token: string, username: string, error: any) => {
    const result = await session.run(
        "MATCH (n: `user`)-[r: `chat`]-(m: `chatroom`)-[r: `chat`]-(p:`user`) " +
        "WHERE n.Token = \"" + token + "\" AND p.Username = \"" + username + "\" " +
        "RETURN m").catch(e => error(e));
        return result.records.map((p: any) => p.get(0));
};