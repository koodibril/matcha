const neo4j = require('neo4j-driver')

const driver = neo4j.driver('neo4j://192.168.99.100:7687', neo4j.auth.basic('neo4j', 'matcha'))
const session = driver.session()
const personName = 'Alice'

async function trydb() {
	try {
		const result = await session.run('CREATE (a:Person {name: $name}) RETURN a',
			{ name: personName }
		)
		if (result.records) {
			const singleRecord = result.records[0]
			const node = singleRecord.get(0)
	
			console.log(node.properties.name)
		}
	} finally {
		await session.close()
	}
await driver.close()
}
