import { getSession } from '../../shared/neo4j/neo4j'
import { internalError } from '../../shared/utils';
import { getUserInfo, updateUserPictures } from '../../shared/neo4j/queries';
import fs from 'fs';

const uploadDir = './public/users/tmp';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true});
}

export const uploadImage = async (req: any, res: any) => {
  const session = getSession();
  const Busboy = require('busboy');

  try {
    let token = '';
    let fileName = '';
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(file: any, filename: any) {
      fileName = filename;
      file.pipe(fs.createWriteStream(uploadDir + '/' + filename));
      console.log('Uploading: ' + filename);
    });
    busboy.on('field', async function (fieldname: any, val: any) {
      if (fieldname === 'token') {
        try {
          token = val;
          const userInfo = await getUserInfo({ token }, session) as any;
          console.log(userInfo);
          let pictures = userInfo.properties.Pictures as string[];
          const username = userInfo.properties.Username;
          const userDir = './public/users/' + userInfo.identity;
          if (!fs.existsSync(userDir)) {
              fs.mkdirSync(userDir);
          }
          fs.rename(uploadDir + '/' + fileName, userDir + '/' + fileName, function (err) {
            if (err)
              throw err;
          });
          let block = false;
          pictures.forEach(function (picture, i) {
            if (picture === '' && !block) {
              pictures[i] = userDir + '/' + fileName;
              block = true;
            }
          });
          console.log(pictures);
          await updateUserPictures({ username, pictures }, session);
        } catch (e) {
          return internalError(res)(e);
        } finally {
          await session.close();
        }
      }
    });
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);
  } catch (e) {
    return internalError(res)(e);
  }
}