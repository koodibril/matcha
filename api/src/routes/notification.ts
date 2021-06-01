import { Router } from 'express';
import { clearNotification } from '../controllers/notification/clearNotifications';
import { getNotifications } from '../controllers/notification/getNotifications';
import { updateNotification } from '../controllers/notification/updateNotification';

const router = Router();

router.post('/get', getNotifications);
router.post('/update', updateNotification);
router.post('/clear', clearNotification);

export default router;