const toUpper = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
const generateParams = (params: (string)[], update: boolean, relationship: boolean) => 
    params.map(p => `${update ? relationship ? 'r.' : 'a.' : '' }${toUpper(p)}${update ? ' =' : ':'} $${p.toLowerCase()}`);


export const generateQuery = (actions: string[], models: string[], params: string[][], updates: string[], getCount: boolean) => {
    let querie = '';
    querie = actions[0].toUpperCase() + ' ' //MATCH or CREATE
    if (models.length === 1) { //we just want one node
        querie = querie + '(a: ' + toUpper(models[0]) + ' { ' + generateParams(params[0], false, false) + ' }) ';
    } else if (models.length === 2) { // we are going to create a relationship
        querie = querie
        + '(a: ' + toUpper(models[0]) + ' { ' + generateParams(params[0], false, false) + ' }), '
        + '(b: ' + toUpper(models[1]) + ' { ' + generateParams(params[1], false, false) + ' }) ';
    } else if (models.length === 3) { // we are looking for a relationship between 2 nodes
        querie = querie
        + '(a: ' + toUpper(models[0]) + ' { ' + generateParams(params[0], false, false) + ' })'
        + '<-[r: ' + models[1].toUpperCase() + ']->' //the double arrow will return all relationship in both ways
        + '(b: ' + toUpper(models[2]) + ' { ' + generateParams(params[2], false, false) + ' }) ';
    }
    if (actions.length === 2) { //we want to either create a relationship, or update a user or a relationship or match with a specific search
        querie = querie + actions[1].toUpperCase() + ' '; // CREATE or SET or WHERE
        if (models.length === 1) { //update a user or match a specific search
            if (actions[1] === 'where') { // search query
                querie = 'MATCH (n: User) WHERE '; // here I guess this query can only be written in brut
            } else if (actions[1] === 'set') { //update query
                querie = querie
                + generateParams(updates, true, false) + ' ';
            }
        } else if (models.length === 2){ //create relationship 
            querie = querie
            + '(a)-[r: ' + updates[0].toUpperCase() + ']->(b) ';
        } else if (models.length === 3) { //update relationship
            querie = querie
            + generateParams(updates, true, true) + ' ';
        }
    }
    querie = querie + 'RETURN ' + (getCount ? 'COUNT(' : '(') + (models.length === 1 ? 'a' : 'r') + ')';
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