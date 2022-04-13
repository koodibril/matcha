import { Session } from 'neo4j-driver';

export const createChatRoom = async (session: Session, token: string, username: string, error: any) => {
    const result = await session.run('\
        CREATE (n: `user`)-[r: `chat`]-(m: `chatroom`)-[r: `chat`]-(p:`user`) \
        WHERE n.`token` = ' + token + ' AND p.`username` = ' + username + ' \
        RETURN m').catch(e => error(e));
    console.log(result.records);
    return result.records;
};