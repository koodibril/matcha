import { Session } from 'neo4j-driver';
import { Filter } from './filter.d';

export const searchUsers = async (session: Session, filter: Filter, token: string) => {
    const result = await session.run(
        "MATCH (n: `user`) " +
        "WHERE any(x IN n.Gender WHERE x IN $gender) " +
        "AND (any(y IN n.Interests WHERE y IN $interests) OR " + 
        " any(z IN n.Interests WHERE z IN $Lfinterests)) " + 
        "AND n.Popularity >= $popularity[0] AND n.Popularity <= $popularity[1] " +
        "AND n.Age >= $agegap[0] AND n.Age <= $agegap[1] " +
        "AND n.Token <> $token " +
        "RETURN n LIMIT 25", { token: token, ...filter });
    return result.records.map((p: any) => p.get(0));
};