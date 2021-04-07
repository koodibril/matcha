import { getSession } from '../../shared/neo4j/neo4j'
import { info, internalError } from '../../shared/utils';
import { getUserInfoT, updateUserPictures } from '../../shared/neo4j/queries';
import fs from 'fs';



export const removeImage = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const picture = req.body.picture;

  try {
    let userInfoU = await getUserInfoT({ token }, session, internalError(res));
    const url = new URL(picture.url as string);
    let urlpic = url.pathname.slice(1);
    if (urlpic) {
      let pictures = userInfoU[0].properties.Pictures as string[];
      const username = userInfoU[0].properties.Username;
      let block = false;
      if (pictures.length > 1) {
        pictures.forEach(function (pic, i) {
          if (pic === urlpic && !block) {
            pictures[i] = '';
            block = true;
          }
        });
        userInfoU = await updateUserPictures({ username, pictures }, session, internalError(res));
        if (fs.existsSync('./public/' + urlpic))
          fs.unlinkSync('./public/' + urlpic);
      }
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