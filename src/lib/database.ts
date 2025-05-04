import knex from 'knex';
import knexfile from '../../knexfile.mjs' assert { type: 'json' };

type Env = keyof typeof knexfile;
const env = (process.env.NODE_ENV ?? 'development') as Env;
const config = knexfile[env];

const db = knex(config);

export default db;
