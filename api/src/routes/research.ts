import { Router } from 'express';
import { getFilter } from '../controllers/research/getFilter';
import { getResearchResult } from '../controllers/research/research';
import { updateFilter } from '../controllers/research/updateFilter';

const router = Router();

router.post('/do', getResearchResult);
router.post('/update', updateFilter);
router.post('/get', getFilter);

export default router;