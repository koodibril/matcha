import { getSession } from '../../shared/neo4j/neo4j'
import { getRelationship, getSearchResult } from '../../shared/neo4j/queries';
import { info, internalError } from '../../shared/utils';

export const getResearchResult = async (req: any, res: any) => {
  const session = getSession();
  const {
      ageGap,
      proximity,
      popularity,
      interests,
      token
  } = req.body;
  console.log(req.body);

  try {
    const results = await getSearchResult({ ageGap, proximity, popularity, interests }, session) as any;
    let index = 0;
    for (const element of results) {
      const username = element.properties.Username;
      const relationship = await getRelationship({ token, username}, session);
      console.log(relationship);
      results[index].properties.relationship = relationship;
      index++;
    }

    info(`userlist collected`);
    return res
      .status(200)
      .json({ results })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}