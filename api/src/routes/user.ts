import { Router } from 'express';
import { login } from '../controllers/auth/login';
import { signup } from '../controllers/auth/signup';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;