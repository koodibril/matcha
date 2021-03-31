const toUpper = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
const generateParams = (params: (string)[], update: boolean, relationship: boolean, chatroom: boolean) => 
    params.map(p => `${update ? relationship ? chatroom ? 'c.' : 'r.' : 'a.' : '' }${toUpper(p)}${update ? ' =' : ':'} $${p.toLowerCase()}`);


export const generateQuery = (actions: string[], models: string[], params: string[][], updates: string[], conditions: string, getCount: boolean) => {
    let querie = '';
    querie = actions[0].toUpperCase() + ' ' //MATCH or CREATE
    if (models.length === 1) { //we just want one node
        if (params) {
            querie = querie 
            + '(a: ' + toUpper(models[0]) + ' { ' + generateParams(params[0], false, false, false) + ' }) ';
        } else { //querie for search
            querie = querie 
            + '(a: ' + toUpper(models[0]) + ') ';
        }
    } else if (models.length === 2) { // we are going to create a relationship
        querie = querie
        + '(a: ' + toUpper(models[0]) + ' { ' + generateParams(params[0], false, false, false) + ' }), '
        + '(b: ' + toUpper(models[1]) + ' { ' + generateParams(params[1], false, false, false) + ' }) ';
    } else if (models.length === 3) { // we are looking for a relationship between 2 nodes
        querie = querie
        + '(a: ' + toUpper(models[0]) + ' { ' + generateParams(params[0], false, false, false) + ' })'
        + '<-[r: ' + models[1].toUpperCase() + ']->' //the double arrow will return all relationship in both ways
        + '(b: ' + toUpper(models[2]) + ' { ' + generateParams(params[2], false, false, false) + ' }) ';
    } else if (models.length === 5) { // querie for chatroom
        querie = querie 
        + '(a: ' + toUpper(models[0]) + ' { ' + generateParams(params[0], false, false, false) + ' })'
        + '<-[r1: ' + models[1].toUpperCase() + ']->' //the double arrow will return all relationship in both ways
        + '(c: ' + toUpper(models[2]) + ') '
        + '<-[r2: ' + models[3].toUpperCase() + ']->' //the double arrow will return all relationship in both ways
        + '(b: ' + toUpper(models[4]) + ' { ' + generateParams(params[1], false, false, false) + ' }) ';
    }
    if (actions.length === 2) { //we want to either create a relationship, or update a user or a relationship or match with a specific search
        querie = querie + actions[1].toUpperCase() + ' '; // CREATE or SET or WHERE
        if (models.length === 1) { //update a user or match a specific search
            if (actions[1] === 'where') { // search query
                querie = querie
                + conditions; // here I guess this query can only be written in brut
            } else if (actions[1] === 'set') { //update query
                querie = querie
                + generateParams(updates, true, false, false) + ' ';
            }
        } else if (models.length === 2){ //create relationship or chatroom
            if (conditions === 'chatroom') {
                querie = querie
                + '(a)-[r1:CHAT]->(c: Chatroom)-[r2:CHAT]->(b) ';
            } else {
                querie = querie
                + '(a)-[r: ' + updates[0].toUpperCase() + ']->(b) ';
            }
        } else if (models.length === 3) { //update relationship
            querie = querie
            + generateParams(updates, true, true, false) + ' ';
        } else if (models.length === 5) { //update chatroom
            querie = querie
            + generateParams(updates, true, true, true) + ' ';
        }
    }
    if (actions.length === 3) { //SET after WHERE
        querie = querie + actions[2].toUpperCase() + ' ';
        if (models.length === 1) { //Update user or chatroom
            querie = querie
            + generateParams(updates, true, false, false) + ' ';
        } else if (models.length === 3) { //Update relationship
            querie = querie
            + generateParams(updates, true, true, false) + ' ';
        }
    }
    querie = querie + 'RETURN ' 
    + (getCount ? 'COUNT(' : '(') 
    + (models.length === 1 ? 'a' : (conditions === 'chatroom' ? 'c' : 'r')) + ')';
    return querie;    
}

/*
CREATE (a: User{a.name: toto})
RETURN a
console.log(generateQuery(['create'], ['user'], [['name']], [], false));
*/

/*
MATCH (a: User {a.name: toto})<-[r: ACTION]->(b: User {b.token: !@#$%^&*()_+})
RETURN r
console.log(generateQuery(['match'], ['user', 'action', 'user'], [[]], [], false));
*/

/*
MATCH (a: User {a.name: toto})<-[r: ACTION]->(b: User {b.token: !@#$%^&*()_+})
SET r.name = yolo
RETURN r
console.log(generateQuery(['match', 'set'], ['user', 'action', 'user'], [['name'], [], ['token']], ['name'], false));
*/

/*
MATCH (a: User {a.name: toto}), (b: User {b.token: !@#$%^&*()_+})
CREATE a-[r: ACTION]->b
RETURN r
console.log(generateQuery(['match', 'create'], ['user', 'user'], [['name'], ['token']], ['action'], false));
*/

/*
MATCH (n: User)
WHERE n.age >= 10
RETURN n
gotta find something for this
*/

/*
MATCH (a: User{a.name: toto})
SET a.mail = toto@gmail.com
RETURN a
console.log(generateQuery(['match', 'set'], ['user'], [['name']], ['mail'], false));
*/