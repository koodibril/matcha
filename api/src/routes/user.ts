import { Router } from 'express';
import { login } from '../controllers/auth/login';
import { signup } from '../controllers/auth/signup';
import { getProfileInfo } from '../controllers/profile/getProfile';
import { uploadImage } from '../controllers/profile/uploadImage';
import { removeImage } from '../controllers/profile/removeImage';
import { updateProfile } from '../controllers/profile/updateProfile';
import { activateUser } from '../controllers/auth/activate';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/activate', activateUser);
router.post('/profile/info', getProfileInfo);
router.post('/profile/update', updateProfile);
router.post('/picture/upload', uploadImage);
router.post('/picture/remove', removeImage);

export default router;