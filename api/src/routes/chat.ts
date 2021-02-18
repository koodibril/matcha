import { Router } from 'express';
import { getChatRoomUser } from '../controllers/chat/getChatRoom';
import { updateChatRoomUser } from '../controllers/chat/updateChatRoom';

const router = Router();

router.post('/get', getChatRoomUser);
router.post('/update', updateChatRoomUser);

export default router;