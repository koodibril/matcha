import { getChatRoomUser } from './handlers/getChatRoom';
import { updateChatRoomUser } from './handlers/updateChatRoom';

export default (req: any, res: any) => {
    const { path } = req;

    switch (path) {
        case 'update':
            updateChatRoomUser(req, res);
            break
        case 'get':
            getChatRoomUser(req, res);
            break;
    }
}
