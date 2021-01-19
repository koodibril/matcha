import { Router } from 'express';
import { login } from '../controllers/auth/login';
import { signup } from '../controllers/auth/signup';
import { getProfileInfo } from '../controllers/profile/getProfile';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/profile/info', getProfileInfo);

export default router;