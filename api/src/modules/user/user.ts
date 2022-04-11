
import { login } from './handlers/login';
import { signup } from './handlers/signup';
import { activateUser } from './handlers/activate';
import { changePassword } from './handlers/changePassword';
import { recoverPassword } from './handlers/recoverPassword';
import { changeEmail } from './handlers/updateEmail';
import { changeUsername } from './handlers/updateUsername';
import { changeSurname } from './handlers/updateSurname';
import { changeName } from './handlers/updateName';

export default (req: any, res: any) => {
    const { path } = req;

    switch (path) {
        case 'signup':
            signup(req, res);
            break;

        case 'login':
            login(req, res);
            break;

        case 'activate':
            activateUser(req, res);
            break;

        case 'password':
            changePassword(req, res);
            break;
        
        case 'email':
            changeEmail(req, res);
            break;

        
        case 'username':
            changeUsername(req, res);
            break;

        case 'surname':
            changeSurname(req, res);
            break;

        case 'name':
            changeName(req, res);
            break;

        case 'recovery':
            recoverPassword(req, res);
            break;

        default:
            res.sendStatus(500);
            break;
    }
}
