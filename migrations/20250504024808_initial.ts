import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const isPG = knex.client.config.client === 'pg';

	// Create the extension if using PostgreSQL
	if (isPG) {
		await knex.raw('CREATE EXTENSION IF NOT EXISTS postgis');
	}

	// Create device table
	await knex.schema.createTable('device', (table) => {
		table.increments('id').primary();
		table.uuid('uuid').notNullable().index();
		table.string('name').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
		table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
	});

	// Create geo_data table with FK to device
	await knex.schema.createTable('geo_data', (table) => {
		table.timestamp('timestamp').notNullable();
		table.integer('device_id').unsigned().notNullable(); // Foreign Key to device
		table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();

		if (isPG) {
			// PostGIS for PostgreSQL
			table.specificType('location', 'geometry(Point, 4326)').notNullable();
		} else if (knex.client.config.client === 'sqlite3') {
			// SQLite as text or GeoJSON
			table.text('location').notNullable();
		}

		// Set composite primary key on (timestamp, device_id)
		table.primary(['timestamp', 'device_id']);

		// Foreign Key: relates to device table
		table.foreign('device_id').references('device.id').onDelete('CASCADE');
	});

	if (isPG) {
		// Create index on location column for PostGIS
		await knex.schema.raw(`
      CREATE INDEX geo_data_location_gist ON geo_data USING GIST (location);
    `);
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('geo_data');
	await knex.schema.dropTableIfExists('device');
}
