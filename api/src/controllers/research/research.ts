import { getSession } from '../../shared/neo4j/neo4j'
import { getSearchResult } from '../../shared/neo4j/queries';
import { info, internalError } from '../../shared/utils';

export const getResearchResult = async (req: any, res: any) => {
  const session = getSession();
  const {
      ageGap,
      proximity,
      popularity,
      interests
  } = req.body;
  console.log(req.body);

  try {
    const results = await getSearchResult({ ageGap, proximity, popularity, interests }, session);
    console.log(results)

    info(`relationship collected`);
    return res
      .status(200)
      .json({ results })
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}