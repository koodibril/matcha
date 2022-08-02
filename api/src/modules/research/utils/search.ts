import { Session } from 'neo4j-driver';
import { Filter } from './filter.d';

export const searchUsers = async (session: Session, filter: Filter, token: string) => {
    // console.log({ token: token, ...filter })
    const result = await session.run(
        "MATCH (n: `user`) " +
        "OPTIONAL MATCH (a: `user`{Token: $token})-[r: `action`]->(n)" + 
        "WITH *, round(point.distance(point({longitude: n.Longitude, latitude: n.Latitude}), point({longitude: $location.longitude, latitude: $location.latitude}))) AS Distance " + 
        "WHERE any(x IN n.Gender WHERE x IN $gender) " +
        "AND (any(y IN n.Interests WHERE y IN $interests) OR " + 
        "any(z IN n.Interests WHERE z IN $Lfinterests)) " + 
        "AND n.Popularity >= $popularity[0] AND n.Popularity <= $popularity[1] " +
        "AND n.Age >= $agegap[0] AND n.Age <= $agegap[1] " +
        "AND n.Token <> $token " +
        "AND Distance <= $proximity " +
        "AND (r.Like IS NULL OR r.Like = false) " +
        "AND (r.Block IS NULL OR r.Block = false) " +
        "SET n.Distance = Distance / 1000 " +
        "RETURN n ORDER BY n.Popularity DESC LIMIT 25", { token: token, ...filter });
        // console.log(result);
    return result.records.map((p: any) => p.get(0));
};