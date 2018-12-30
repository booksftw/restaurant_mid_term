
exports.up = function(knex, Promise) {

  const addUsers = knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('role');
  }).return();

  const add_users_FK_to_restaurants = knex.schema.table('restaurants', (table) => {
      table.string('user_id');
      table.foreign('user_id').references('users.id')
  }).return();

  const add_users_FK_to_orders = knex.schema.table('orders', (table) => {
      table.string('user_id');
      table.foreign('user_id').references('users.id')
  }).return()

  return Promise.all([
      addUsers,
      add_users_FK_to_restaurants,
      add_users_FK_to_orders
  ])
  
};

exports.down = function(knex, Promise) {
  
};
