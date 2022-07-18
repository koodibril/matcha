import { Session } from 'neo4j-driver';
import { generateParams } from '../../../shared/utils';

export const updateChatRoom = async (session: Session, chatData: any, token: string, username: string, error: any) => {
    const result = await session.run(
        "MATCH (n: `user`)-[r: `chat`]-(m: `chatroom`)-[r: `chat`]-(p:`user`) " +
        "WHERE n.Token = \"" + token + "\" AND p.Username = \"" + username + "\" " +
        "SET " + generateParams(Object.keys(chatData), 'm', true) + " " +
        "RETURN m").catch(e => error(e));
        return result.records.map((p: any) => p.get(0));
};