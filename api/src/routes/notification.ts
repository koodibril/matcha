import { Router } from 'express';
import { addNotification } from '../controllers/notification/addNotification';
import { clearNotification } from '../controllers/notification/clearNotifications';
import { getNotifications } from '../controllers/notification/getNotifications';
import { updateNotification } from '../controllers/notification/updateNotification';

const router = Router();

router.post('/get', getNotifications);
router.post('/update', updateNotification);
router.post('/clear', clearNotification);
router.post('/add', addNotification);

export default router;