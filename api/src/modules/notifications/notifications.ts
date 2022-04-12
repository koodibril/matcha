import { Router } from 'express';
import { addNotification } from './handlers/addNotification';
import { clearNotification } from './handlers/clearNotifications';
import { getNotifications } from './handlers/getNotifications';
import { updateNotification } from './handlers/updateNotification';

const router = Router();

router.post('/get', getNotifications);
router.post('/update', updateNotification);
router.post('/clear', clearNotification);
router.post('/add', addNotification);

export default router;