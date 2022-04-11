import util from 'util';

import { myUserCreationQuery } from '../utils/createUser';

const debug = (o: any ) => console.log(util.inspect(o, false, null, true));

export default (req, res) => {
    debug({ req, res });
    return res.status(200);
}