import { Session } from 'neo4j-driver';
import { generateParams } from '../../../shared/utils';
import { Relation } from './relation.d';

export const createRelationship = async (session: Session, relationData: Relation, token: string, username: string, error: any) => {
    const result = await session.run('\
        CREATE (n:`user`)-[r:`action`]-(m:`user`)\
        WHERE n.token = ' + token + ' AND m.username = ' + username + '\
        SET ' + generateParams(Object.keys(relationData), 'r', true) + '\
        RETURN r').catch(e => error(e));
    console.log(result.records);
    return result.records;
};