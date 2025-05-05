const pg = {
	client: 'pg',
	connection: process.env.DATABASE_URL,
	pool: { min: 2, max: 10 },
	migrations: {
		directory: './migrations',
		extension: 'ts'
	}
};

const config = {
	test: pg,
	development: pg,
	production: pg
};

export default config;
