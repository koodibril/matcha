import { likeProfile } from './handlers/likeProfile';
import { blockProfile } from './handlers/blockProfile';
import { getRelationshipInfo } from './handlers/getRelationship';
import { getMatchedProfiles } from './handlers/getMatchedProfiles';

export default (req: any, res: any) => {
    const { path } = req;

    switch (path) {
        case 'like':
            likeProfile(req, res);
            break

        case 'block':
            blockProfile(req, res);
            break

        case 'get':
            getRelationshipInfo(req, res);
            break

        case 'matched':
            getMatchedProfiles(req, res);
            break
    }
}
