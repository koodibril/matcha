import { Router } from 'express';
import { likeProfile } from '../controllers/relationship/likeProfile';
import { blockProfile } from '../controllers/relationship/blockProfile';
import { getRelationshipInfo } from '../controllers/relationship/getRelationship';
import { getMatchedProfiles } from '../controllers/relationship/getMatchedProfiles';

const router = Router();

router.post('/like', likeProfile);
router.post('/block', blockProfile);
router.post('/get', getRelationshipInfo);
router.post('/matched', getMatchedProfiles);

export default router;