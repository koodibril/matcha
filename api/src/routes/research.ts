import { Router } from 'express';
import { getResearchResult } from '../controllers/research/research';

const router = Router();

router.post('/do', getResearchResult);

export default router;