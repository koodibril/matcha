import { Router } from 'express';
import { zergRush } from '../shared/neo4j/seeder';

const router = Router();

router.post('/', zergRush);

export default router;