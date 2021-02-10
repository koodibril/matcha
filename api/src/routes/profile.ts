import { Router } from 'express';
import { getProfileInfo } from '../controllers/profile/getProfile';
import { uploadImage } from '../controllers/profile/uploadImage';
import { removeImage } from '../controllers/profile/removeImage';
import { updateProfile } from '../controllers/profile/updateProfile';

const router = Router();

router.post('/info', getProfileInfo);
router.post('/update', updateProfile);
router.post('/picture/upload', uploadImage);
router.post('/picture/remove', removeImage);

export default router;