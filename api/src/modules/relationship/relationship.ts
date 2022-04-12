import { Router } from 'express';
import { likeProfile } from './handlers/likeProfile';
import { blockProfile } from './handlers/blockProfile';
import { getRelationshipInfo } from './handlers/getRelationship';
import { getMatchedProfiles } from './handlers/getMatchedProfiles';

const router = Router();

router.post('/like', likeProfile);
router.post('/block', blockProfile);
router.post('/get', getRelationshipInfo);
router.post('/matched', getMatchedProfiles);

export default router;