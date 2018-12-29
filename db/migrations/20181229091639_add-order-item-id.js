
exports.up = function(knex, Promise) {
  const dropPrimary = knex.schema.table('order_items', (table) => {
    table.dropPrimary();
  });

  const addId = knex.schema.table('order_items', (table) => {
    table.increments('id');
  });

  return dropPrimary.then(() => addId);
};

exports.down = function(knex, Promise) {
  return knex.schema.table('order_items', (table) => {
    table.dropColumn('id');
    table.primary(['order_id','item_id']);
  });
};
