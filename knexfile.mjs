const config = {
	test: {},
	development: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		pool: { min: 2, max: 10 },
		migrations: {
			directory: './migrations',
			extension: 'ts'
		}
	},
	production: {}
};

config.production = config.development;

export default config;
