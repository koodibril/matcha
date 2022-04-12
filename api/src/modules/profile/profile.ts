import { Router } from 'express';
import { getProfileInfo } from './handlers/getProfile';
import { uploadImage } from './handlers/uploadImage';
import { removeImage } from './handlers/removeImage';
import { updateProfile } from './handlers/updateProfile';

const router = Router();

router.post('/info', getProfileInfo);
router.post('/update', updateProfile);
router.post('/picture/upload', uploadImage);
router.post('/picture/remove', removeImage);

export default router;