exports.up = function(knex, Promise) {

  const rebuild_menu_items = knex.schema
    .createTable("menu_items", table => {
        table.increments('id')
        table.integer('menu_id')
        table.foreign('menu_id').references('id').inTable('menus');
        table.integer('item_id')
        table.foreign('item_id').references('id').inTable('items');
    })
    .return();

  const rebuild_order_items = knex.schema
      .createTable("order_items", table => {
        table.increments('id')
        table.integer('qty');
        table.integer('order_id')
        table.foreign('order_id').references('id').inTable('orders');
        table.integer('item_id')
        table.foreign('item_id').references('id').inTable('items');
      })
      .return();


    return Promise.all([
        rebuild_menu_items,
        rebuild_order_items
    ])
};

exports.down = function(knex, Promise) {

    const drop_order_items = knex.schema.dropTable('order_items').return()
    const drop_menu_items = knex.schema.dropTable('menu_items').return()

    return Promise.all([
        drop_order_items,
        drop_menu_items,
    ])
};
