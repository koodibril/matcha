import { hashPassword } from '../../modules/user/utils/hashPassword';
import { getSession } from '../../shared/neo4j/neo4j'
import { getToken } from '../jwt/getToken';
import { info, internalError } from "../utils";
import { createUser } from '../../modules/user/utils/createUser';
import { updateUser } from '../../modules/user/utils/updateUser';
const axios = require('axios');

export const zergRush = async (res: any) => {
    const session = getSession();

    const sexos = ['Male', 'Female', 'Bi'];
    const bios = ['jaime les poireaux', 'moi c les courges'];
    const interestss = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];
    const pictures = ['', '', '', '', ''];
    const active = true;
    const valid = true;
    const password = await hashPassword('12345678');

    const countQuery = await session.run("MATCH (n: `user`) RETURN count(n)");
    const check = countQuery.records.map((p: any) => p.get(0));
    if (check[0] < 500) {
            axios.get('https://randomuser.me/api/?results=750&nat=fr')
            .then(async (response: any) => {
                for(let i = 0; i < 750; i++) {
                    const newSession = getSession();
                    const results = response.data.results[i];
                    const username = results.login.username;
                    const firstname = results.name.first;
                    const lastname = results.name.last;
                    const age = results.dob.age;
                    const gender = results.gender;
                    pictures[0] = results.picture.medium;
                    const sexo = sexos[Math.round(Math.random() * (2 - 0) + 0)];
                    const bio = bios[Math.round(Math.random() * (1 - 0) + 0)];
                    let nbOfInterests = Math.round(Math.random() * (5 - 0) + 0);
                    const interests = [''];
                    while (nbOfInterests > 0) {
                        interests.push(interestss[Math.round(Math.random() * (9 - 0) + 0)]);
                        nbOfInterests--;
                    }
                    const email = results.email;
                    const location = results.location.city;
                    const longitude = results.location.coordinates.longitude;
                    const latitude = results.location.coordinates.latitude;
                    const token = getToken({ username });
                    const popularity = Math.round(Math.random() * (10 - 0) + 0);
                    await createUser(newSession, {username, password, firstname, lastname, email, active, valid, token, pictures}, internalError(res));
                    await updateUser(newSession, {token, age, gender, sexo, bio, interests, location, latitude, longitude, valid, popularity}, token, internalError(res));
                    info('Created a new user ' + username);
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
}