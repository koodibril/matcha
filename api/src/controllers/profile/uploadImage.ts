import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import fs from 'fs';

const uploadDir = './uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

export const uploadImage = async (req: any, res: any) => {
  const session = getSession();
  const file = req.body;

  try {
    console.log(file.name);
    console.log(req.body);

    info(`picture received`);
    return res
      .status(200)
      .json(file);
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}