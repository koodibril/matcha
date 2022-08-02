import { Session } from 'neo4j-driver';
import { generateParams } from '../../../shared/utils';
import { Relation } from './relation.d';

export const updateRelationship = async (session: Session, relationData: Relation, token: string, username: string) => {
    const result = await session.run(
        "MATCH (n:`user`)-[r:`action`]->(m:`user`) " +
        "WHERE n.Token = $token AND m.Username = $username " +
        "SET " + generateParams(Object.keys(relationData), 'r', true) + " " +
        "RETURN r", { token: token, username: username, ...relationData });
        return result.records.map((p: any) => p.get(0));
};