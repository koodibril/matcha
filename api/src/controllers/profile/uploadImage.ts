import { getSession } from '../../shared/neo4j/neo4j'
import { internalError } from '../../shared/utils';
import { getUserInfo } from '../../shared/neo4j/queries';
import fs from 'fs';

const uploadDir = './public/users';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

export const uploadImage = async (req: any, res: any) => {
  const session = getSession();
  const Busboy = require('busboy');

  try {
    let token = '';
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('field', async function (fieldname: any, val: any) {
      token = val;
    });
    console.log(token);
    const userInfo = await getUserInfo({ token }, session);
    console.log(userInfo);
    busboy.on('file', function(fieldname: any, file: any, filename: any, encoding: any, mimetype: any, object: any) {
      file.pipe(fs.createWriteStream(userDir + 'test'));
      console.log('Uploading: ' + filename);
    });
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    const userDir = './public/users/' ;
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
    }
    return req.pipe(busboy);
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}