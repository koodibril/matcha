import { getProfileInfo } from './handlers/getProfile';
import { uploadImage } from './handlers/uploadImage';
import { removeImage } from './handlers/removeImage';
import { updateProfile } from './handlers/updateProfile';

export default (req: any, res: any) => {
    const { path } = req;

    switch (path) {
        case 'info':
            getProfileInfo(req, res);
            break

        case 'update':
            updateProfile(req, res);
            break

        case 'picture/upload':
            uploadImage(req, res);
            break

        case 'picture/remove':
            removeImage(req, res);
            break
    }
}
