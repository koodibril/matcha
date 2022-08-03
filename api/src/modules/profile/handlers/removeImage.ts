import { getSession } from '../../../shared/neo4j/neo4j'
import { info, internalError } from '../../../shared/utils';
import { getUser } from '../../user/utils/getUser';
import fs from 'fs';
import { updateUser } from '../../user/utils/updateUser';



export const removeImage = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const picture = req.body.picture;

  try {
    let userInfoU = await getUser(session, { token });
    const url = new URL(picture.url as string);
    let urlpic = url.pathname.slice(1);
    if (urlpic) {
      const pictures = (userInfoU[0].properties.Pictures as string[]).map(elem => {
        if (elem === urlpic) return ''
        return elem
      });
      userInfoU = await updateUser(session, { pictures }, token);
      if (fs.existsSync(`./public/${urlpic}`)) fs.unlinkSync(`./public/${urlpic}`);
    }
    const userInfo = userInfoU[0];

    info(`Image removed`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}
