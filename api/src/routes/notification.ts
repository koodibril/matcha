import { Router } from 'express';
import { getNotifications } from '../controllers/notification/getNotifications';
import { updateNotification } from '../controllers/notification/updateNotification';

const router = Router();

router.post('/get', getNotifications);
router.post('/update', updateNotification);

export default router;