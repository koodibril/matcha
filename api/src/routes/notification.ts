import { Router } from 'express';
import { getNotifications } from '../controllers/notification/getNotifications';

const router = Router();

router.post('/get', getNotifications);

export default router;