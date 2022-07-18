import { Session } from 'neo4j-driver';
import { generateParams } from '../../../shared/utils';
import { Relation } from './relation.d';

export const createRelationship = async (session: Session, relationData: Relation, token: string, username: string, error: any) => {
    const result = await session.run(
        "MATCH (n:`user`), (m:`user`) " +
        "WHERE n.Token = \"" + token + "\" AND m.Username = \"" + username + "\" " +
        "CREATE (n)-[r:`action`]->(m) " +
        "SET " + generateParams(Object.keys(relationData), 'r', true) + " " +
        "RETURN r", relationData).catch(e => error(e));
    return result.records.map((p: any) => p.get(0));
};