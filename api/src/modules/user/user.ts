import { Router } from 'express';
import { login } from './handlers/login';
import { signup } from './handlers/signup';
import { activateUser } from './handlers/activate';
import { changePassword } from './handlers/changePassword';
import { recoverPassword } from './handlers/recoverPassword';
import { changeEmail } from './handlers/updateEmail';
import { changeUsername } from './handlers/updateUsername';
import { changeSurname } from './handlers/updateSurname';
import { changeName } from './handlers/updateName';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/activate', activateUser);
router.post('/password', changePassword);
router.post('/email', changeEmail);
router.post('/username', changeUsername);
router.post('/surname', changeSurname);
router.post('/name', changeName);
router.post('/recovery', recoverPassword);

export default router;