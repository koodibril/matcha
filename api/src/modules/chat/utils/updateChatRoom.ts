import { Session } from 'neo4j-driver';
import { generateParams } from '../../../shared/utils';

export const updateChatRoom = async (session: Session, chatData: any, token: string, username: string) => {
    const result = await session.run(
        "MATCH (n: `user`)-[r1: `chat`]-(m: `chatroom`)-[r2: `chat`]-(p:`user`) " +
        "WHERE n.Token = $token AND p.Username = $username " +
        "SET " + generateParams(Object.keys(chatData), 'm', true) + " " +
        "RETURN m", { token: token, username: username, ...chatData });
        return result.records.map((p: any) => p.get(0));
};