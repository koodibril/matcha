const toUpper = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
const generateParams = (params: (string)[], update: boolean, relationship: boolean) => 
    params.map(p => `${update ? relationship ? 'r.' : 'a.' : '' }${toUpper(p)}${update ? '=' : ':'} $${p.toLowerCase()}`);


export const generateQuery = (actions: string[], models: string[], params: string[][], updates: string[], getCount: boolean) => {
    let querie = '';
    querie = actions[0].toUpperCase() + ' ' //MATCH or CREATE
    if (models.length === 1) { //we just want one node
        querie = querie + '(a: ' + models[0] + ' { ' + generateParams(params[0], false, false) + ' }) ';
    } else if (models.length === 2) { // we are going to create a relationship
        querie = querie
        + '(a: ' + models[0] + ' { ' + generateParams(params[0], false, false) + ' }), '
        + '(b: ' + models[2] + ' { ' + generateParams(params[1], false, false) + ' }) ';
    } else if (models.length === 3) { // we are looking for a relationship between 2 nodes
        querie = querie
        + '(a: ' + models[0] + ' { ' + generateParams(params[0], false, false) + ' })'
        + '<-[r: ' + models[1] + ']->' //the double arrow will return all relationship in both ways
        + '(b: ' + models[2] + ' { ' + generateParams(params[1], false, false) + ' }) ';
    }
    if (actions.length === 2) { //we want to either create a relationship, or update a user or a relationship or match with a specific search
        querie = querie + actions[1].toUpperCase() + ' '; // CREATE or SET or WHERE
        if (models.length === 1) { //update a user or match a specific search
            if (actions[1] === 'where') { // search query
                querie = 'MATCH (n: User) WHERE '; // here I guess this query can only be written in brut
            } else if (actions[1] === 'set') { //update query
                querie = querie
                + generateParams(updates, true, false);
            }
        }
    }
    querie = querie + 'RETURN ' + `${getCount ? 'COUNT(a)' : 'a'}`;    
}

/*
CREATE (a: User{a.name: toto})
RETURN a

MATCH (a: User {a.name: toto})<-[r: ACTION]->(b: User {b.token: !@#$%^&*()_+})
RETURN r

MATCH (a: User {a.name: toto})<-[r: ACTION]->(b: User {b.token: !@#$%^&*()_+})
SET r.name = yolo
RETURN r

MATCH (a: User {a.name: toto}), (b: User {b.token: !@#$%^&*()_+})
CREATE a-[r: ACTION]->b
RETURN r

MATCH (n: User)
WHERE n.age >= 10
RETURN n

MATCH (a: User{a.name: toto})
SET a.mail = toto@gmail.com
RETURN a
*/