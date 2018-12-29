
exports.up = function(knex, Promise) {

  const renameDishes = knex.schema.renameTable('dishes', 'items');

  const fixRestaurantid = knex.schema.table('menus', (table) => {
    table.dropColumn('restaurantid');
    table.integer('restaurant_id');
    table.foreign('restaurant_id').references('id').inTable('restaurants');
  });

  const dropMenuItems = knex.schema.dropTable('menu_items');

  const rebuildMenuItems = knex.schema.createTable('menu_items', (table) => {
    table.integer('menu_id')
    table.foreign('menu_id').references('id').inTable('menus');
    table.integer('item_id')
    table.foreign('item_id').references('id').inTable('items');
    table.primary(['menu_id','item_id'])
  });

  const fixOrderRestId = knex.schema.table('orders', (table) => {
    table.foreign('restaurant_id').references('id').inTable('restaurants');
  });

  const dropLineItems = knex.schema.dropTable('line_items');

  const rebuildLineItems = knex.schema.createTable('order_items', (table) => {
    table.integer('qty');
    table.integer('order_id')
    table.foreign('order_id').references('id').inTable('orders');
    table.integer('item_id')
    table.foreign('item_id').references('id').inTable('items');
    table.primary(['order_id','item_id'])
  });

  return renameDishes.then(() => fixRestaurantid).then(() => dropMenuItems).then(() => rebuildMenuItems).then(() => fixOrderRestId).then(() => dropLineItems).then(() => rebuildLineItems);
};

exports.down = function(knex, Promise) {

  const renameItems = knex.schema.renameTable('items', 'dishes');

  const breakRestaurantId = knex.schema.table('menus', (table) => {
    table.dropColumn('restaurant_id');
    table.integer('restaurantid').unsigned();
    table.foreign('id').references('restaurants');
  });

  const dropMenuItems = knex.schema.dropTable('menu_items');

  const createMenuItemsTable = knex.schema.createTable('menu_items', (table) => {
      table.increments('id');
      table.integer('menu_id');
      table.foreign('id').references('menus');
      table.integer('menu_item_id');
      table.foreign('id').references('dishes');
  });

  const breakOrderRestId = knex.schema.table('orders', (table) => {
    table.dropForeign('restaurant_id');
  });

  const dropLineItems = knex.schema.dropTable('order_items');

  const createLineItems = knex.schema.createTable('line_items', (table) => {
    table.increments('id');
    table.integer('order_id');
    table.foreign('id').references('orders');
    table.integer('menu_item_id');
    table.foreign('id').references('menu_items');
    table.integer('qty').unsigned();
  });

  return renameItems.then(() => breakRestaurantId).then(() => dropMenuItems).then(() => createMenuItemsTable).then(() => breakOrderRestId).then(() => dropLineItems).then(() => createLineItems);
};
