import { Router } from 'express';
import { getFilter } from './handlers/getFilter';
import { getResearchResult } from './handlers/research';
import { updateFilter } from './handlers/updateFilter';

const router = Router();

router.post('/do', getResearchResult);
router.post('/update', updateFilter);
router.post('/get', getFilter);

export default router;