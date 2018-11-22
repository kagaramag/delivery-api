
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) =>{
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('state').notNullable();
    table.timestamp('created_time').defaultTo(knex.fn.now());
    table.timestamp('updated_time').defaultTo(knex.fn.now());
  })
  .createTable('parcels', (table) => {
      table.increments();
      table.string('id_postman').notNullable();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('weight').notNullable();
      table.string('state').notNullable();
      table.string('pickup').notNullable();
      table.string('dropoff').notNullable();
      table.integer('distance').notNullable();
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.timestamp('updated_time').defaultTo(knex.fn.now());
      table.integer('id_client').references('id').inTable('users');
  })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('parcels').dropTable('users');
};
