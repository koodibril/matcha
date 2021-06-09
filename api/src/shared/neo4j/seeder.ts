import { hashPassword } from '../../controllers/auth/hashPassword';
import { getSession } from '../../shared/neo4j/neo4j'
import { getToken } from '../jwt/getToken';
import { info, internalError } from "../utils";
import { createUser, getUserNumber, updateOnline, updateUserData, updateUserInfo } from './queries';

export const zergRush = async (res: any) => {
    const session = getSession();

    const usernames = ['tatie', 'toto'];
    const email = 'dummy@dummy.dummy';
    const genders = ['Male', 'Female'];
    const sexos = ['Male', 'Female', 'Bi'];
    const bios = ['jaime les poireaux', 'moi c les courges'];
    const interests = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];
    const pictures = ['', '', '', '', ''];
    const active = true;
    const valid = true;
    const location = 'Paris';
    const longitude = 45;
    const latitude = 123;
    const password = await hashPassword('12345678');

    const check = await getUserNumber({}, session, internalError(res));
    if (check[0] <= 500) {
        for(let i = 0; i < 750; i++) {
            const username = usernames[Math.round(Math.random() * (1 - 0) + 0)] + i;
            const age = Math.round(Math.random() * (80 - 18) + 18);
            const gender = genders[Math.round(Math.random() * (1 - 0) + 0)];
            pictures[0] = gender === 'Male' ? 'Male.jpg' : 'Female.png';
            const sexo = sexos[Math.round(Math.random() * (2 - 0) + 0)];
            const bio = bios[Math.round(Math.random() * (1 - 0) + 0)];
            const token = getToken({ username });
            const popularity = Math.round(Math.random() * (10 - 0) + 0);
            const online = Date.now();
            await createUser({username, password, email, active, valid, token, pictures}, session, internalError(res));
            await updateUserInfo({token, username, email, active}, session, internalError(res));
            await updateUserData({token, age, gender, sexo, bio, interests, location, latitude, longitude, valid, popularity}, session, internalError(res));
            await updateOnline({token, online}, session, internalError(res));
            info('Created a new user ' + username);
        }
    }
}