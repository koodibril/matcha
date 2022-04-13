import { Session } from 'neo4j-driver';
import { Filter } from './filter.d';

export const searchUsers = async (session: Session, filter: Filter, token: string, error: any) => {
    const result = await session.run(
        "MATCH (n: `user`) " +
        "WHERE n.Age >= $agegap[0] AND n.Age <= $agegap[1] " +
        "AND n.Popularity >= $popularity[0] AND n.Popularity <= $popularity[1] AND n.Token <> \"" + token + "\" " +
        "RETURN n LIMIT 25", filter).catch(e => error(e));
    return result.records.map((p: any) => p.get(0));
};