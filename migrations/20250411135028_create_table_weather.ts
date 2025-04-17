import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('weather', (t) => {
    t.increments('id').primary();
    t.float('lat').notNullable();
    t.float('lon').notNullable();
    t.string('part').nullable();
    t.jsonb('data').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('weather');
}
