const neo4j = require('neo4j-driver')

const driver = neo4j.driver('neo4j://192.168.99.100:7687', neo4j.auth.basic('neo4j', 'matcha'), { disableLosslessIntegers: true })

exports.register = (req, res, next) => {
	async function register() {
		const session = driver.session()
		try {
			console.log('checking username');
			let result = await session.run("MATCH (a:User {Username: $username}) RETURN count(a)", { username: req.body.username});
			let singleRecord = result.records[0]
			let used = singleRecord.get(0)
			if (used > 0) {
				return res
				.status(400)
				.json({ message: "Username is already Used" });
			}
			console.log('checking email');
			result = await session.run("MATCH (a:User {Email: $email}) RETURN count(a)", { email: req.body.email});
			singleRecord = result.records[0]
			used = singleRecord.get(0)
			if (used > 0) {
				return res
				.status(400)
				.json({ message: "Email is already Used" });
			}
			console.log('getting id');
			result = await session.run("MATCH (a:User) RETURN count(a)", {});
			singleRecord = result.records[0]
			let id = singleRecord.get(0)
			console.log('registering');
			result = await session.run('CREATE (a:User {Id: $id, Username: $username, Firstname: $firstname, Lastname: $lastname, Password: $password, Email: $email, Token: $token }) RETURN a',
				{
					id: id,
					username: req.body.username,
					firstname: req.body.firstName,
					lastname: req.body.lastName,
					password: req.body.password,
					email: 'lol',
					token: 'fakeone'
				}
			)
			return res
			.json({ message: "Succesfully registered !" });
		} finally {
			await session.close()
		}
	}
	register();
}

exports.login = (req, res, next) => {
	async function login() {
		const session = driver.session();
		try {
			console.log('getting username')
			let result = await session.run("MATCH (a:User {Username: $username}) RETURN count(a)", { username: req.body.username});
			let singleRecord = result.records[0]
			let used = singleRecord.get(0)
			if (used === 0) {
				return res
				.status(400)
				.json({ message: "Username don't exist" });
			}
			result = await session.run("MATCH (a:User {Username: $username}) RETURN a.Password", { username: req.body.username});
			singleRecord = result.records[0]
			password = singleRecord.get(0)
			if (password !== req.body.password) {
				return res
				.status(400)
				.json({ message: "Passwords don't match" });
			}
			return res
			.json({ message: "Succesfully logged in !" });
		} finally {
			await session.close()
		}
	}
	login();
}