import { Router } from 'express';
import { getChatRoomUser } from '../controllers/chat/getChatRoom';

const router = Router();

router.post('/get', getChatRoomUser);

export default router;