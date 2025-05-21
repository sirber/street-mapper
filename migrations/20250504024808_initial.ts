import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	// Create device table
	await knex.schema.createTable('device', (table) => {
		table.increments('id').unsigned().primary();
		table.uuid('external_id').notNullable().index();
		table.string('name').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
		table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
	});

	// Create geo_data table with FK to device
	await knex.schema.createTable('geo_data', (table) => {
		table.timestamp('timestamp').notNullable();
		table.integer('device_id').unsigned().notNullable(); // Foreign Key to device
		table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
		table.specificType('location', 'POINT').notNullable();
		table.primary(['timestamp', 'device_id']);
		table.foreign('device_id').references('device.id').onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('geo_data');
	await knex.schema.dropTableIfExists('device');
}
