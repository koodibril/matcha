import { Router } from 'express';
import { getChatRoomUser } from './handlers/getChatRoom';
import { updateChatRoomUser } from './handlers/updateChatRoom';

const router = Router();

router.post('/get', getChatRoomUser);
router.post('/update', updateChatRoomUser);

export default router;