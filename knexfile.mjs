const my = {
	client: 'mysql2',
	connection: process.env.DATABASE_URL,
	pool: { min: 2, max: 10 },
	migrations: {
		directory: './migrations',
		extension: 'ts'
	}
};

const config = {
	test: my,
	development: my,
	production: my
};

export default config;
