import { Router } from 'express';
import { likeProfile } from '../controllers/relationship/likeProfile';
import { blockProfile } from '../controllers/relationship/blockProfile';
import { getRelationshipInfo } from '../controllers/relationship/getRelationship';

const router = Router();

router.post('/like', likeProfile);
router.post('/block', blockProfile);
router.post('/get', getRelationshipInfo);

export default router;