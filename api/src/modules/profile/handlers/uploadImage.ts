import { getSession } from '../../../shared/neo4j/neo4j'
import { internalError } from '../../../shared/utils';
import fs from 'fs';
import { getUser } from '../../user/utils/getUser';
import { updateUser } from '../../user/utils/updateUser';

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
    let userInfo: any;
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname: any, file: any, filename: any, encoding: any, mimetype: any, object: any) {
      fileName = filename;
      file.pipe(fs.createWriteStream(uploadDir + '/' + filename));
      console.log('Uploading: ' + filename);
    });
    busboy.on('field', async function (fieldname: any, val: any) {
      if (fieldname === 'token') {
        try {
          token = val;
          userInfo = await getUser(session, { token });
          let pictures = userInfo[0].properties.Pictures as string[];
          const userDir = './public/users/' + userInfo[0].identity;
          if (!fs.existsSync(userDir)) {
              fs.mkdirSync(userDir);
          }
          let i = 0;
          let newFileName = fileName;
          while (fs.existsSync(userDir + '/' + newFileName)) {
            newFileName = i + newFileName;
            i++
          }
          fs.rename(uploadDir + '/' + fileName, userDir + '/' + newFileName, function (err) {
            if (err)
              throw err;
          });
          let block = false;
          pictures.forEach(function (picture, i) {
            if (picture === '' && !block) {
              pictures[i] = 'users/' + userInfo[0].identity + '/' + newFileName;
              block = true;
            }
          });
          await updateUser(session, { pictures }, token);
        } catch (e) {
          return internalError(res)(e);
        } finally {
          await session.close();
        }
      } else {
        fs.unlinkSync(uploadDir + '/' + fileName);
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