import { Router } from 'express';
import { login } from '../controllers/auth/login';
import { signup } from '../controllers/auth/signup';
import { activateUser } from '../controllers/auth/activate';
import { changePassword } from '../controllers/auth/changePassword';
import { recoverPassword } from '../controllers/auth/recoverPassword';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/activate', activateUser);
router.post('/password', changePassword);
router.post('/recovery', recoverPassword);

export default router;
