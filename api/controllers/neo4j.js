const neo4j = require('neo4j-driver')
const jwt = require('jsonwebtoken');

const driver = neo4j.driver('neo4j://192.168.99.100:7687', neo4j.auth.basic('neo4j', 'matcha'), { disableLosslessIntegers: true })

const JWT_SECRET_KEY = "xQd394j3@T*5AqHHlkWepspSb^3qszsSm1XdooIAEr^LFDkdm2hDmFn^t*c6Lr@D03Xcjm00K^^@i3qdx8pAUCYQ6uHaw^wF6rH";
const jwtExpiresTime = 300;

exports.register = async (req, res, next) => {
  const session = driver.session()
  const { username, firstname, lastname, email, password } = req.body;

  try {
    const userMatch = await (await session.run("MATCH (a:User {Username: $username}) RETURN count(a)", { username })).records[0];
    const userExists = userMatch.get(0)
    if (userExists > 0) {
      return res
        .status(400)
        .json({ message: "Username is already Used" });
    }

    const emailMatch = await (await session.run("MATCH (a:User {Email: $email}) RETURN count(a)", { email })).records[0];
    const emailExists = emailMatch.get(0);
    if (emailExists > 0) {
      return res
        .status(400)
        .json({ message: "Email is already Used" });
    }

    const token = jwt.sign({ username }, JWT_SECRET_KEY, {
      algorithm: 'HS512',
      expiresIn: jwtExpiresTime
    });

    await session.run('CREATE (a:User {Username: $username, Firstname: $firstname, Lastname: $lastname, Password: $password, Email: $email, Token: $token }) RETURN a',
      { username, firstname, lastname, password, email, token }
    ).catch(e => res.status(500).json(e));

    return res.status(200).json({ token, message: "success" });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e)
  } finally {
    await session.close()
  }
}

exports.login = async (req, res, next) => {
  const session = driver.session();
  const { username, password } = req.body;

  try {
    const userMatch = await (await session.run("MATCH (a:User {Username: $username}) RETURN count(a)", { username })).records[0];
    const usedUsername = userMatch.get(0)

    if (usedUsername === 0) {
      return res
        .status(404)
        .json({ message: "Username don't exist" });
    }
    const passwordMatch = await (await session.run("MATCH (a:User {Username: $username}) RETURN a.Password", { username })).records[0];
    if (password !== passwordMatch.get(0)) {
      return res
        .status(401)
        .json({ message: "Passwords don't match" });
    }

    const token = jwt.sign({ username }, JWT_SECRET_KEY, {
      algorithm: 'HS512',
      expiresIn: jwtExpiresTime
    });

    return res.status(200).json({ token, message: "Succesfully logged in !" });
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  } finally {
    await session.close()
  }
}
