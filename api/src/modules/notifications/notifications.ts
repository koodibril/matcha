import { addNotification } from './handlers/addNotification';
import { clearNotification } from './handlers/clearNotifications';
import { getNotifications } from './handlers/getNotifications';
import { updateNotification } from './handlers/updateNotification';

export default (req: any, res: any) => {
    const { path } = req;

    switch (path) {
        case 'add':
            addNotification(req, res);
            break
            
        case 'get':
            getNotifications(req, res);
            break;

        case 'update':
            updateNotification(req, res);
            break;
            
        case 'clear':
            clearNotification(req, res);
            break;
    }
}
