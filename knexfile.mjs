// knexfile.mjs
/** @type {import('knex').Knex.Config} */
const config = {
	development: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		pool: { min: 2, max: 10 },
		migrations: {
			directory: './migrations',
			extension: 'ts'
		}
	}
};

export default config;
