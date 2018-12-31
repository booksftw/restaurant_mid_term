
exports.up = function(knex, Promise) {
    // ~ UPDATE TO INCLUDE EMAIL P# that stuff maybe get rid of username
  // ~ Update the other parts of the schema
  return knex.schema
  .createTable("users", (table) => {
    table.increments("id");
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("role");
  })
  .return();
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users').return();
};
