exports.up = function(knex, Promise) {
  const drop_menu_items = knex.schema.dropTable("menu_items").return();
  const drop_order_items = knex.schema.dropTable("order_items").return();

  const drop_menus = drop_menu_items
    .then(() => {
      knex.schema.dropTable("menus").return();
    })
    .return();

  const drop_items = drop_menu_items
    .then(() => {
      knex.schema.dropTable("items").return();
    })
    .return();

  // no drop
  const drop_orders = drop_menu_items
    .then(() => {
      knex.schema.dropTable("orders").return();
    })
    .return();

  // no drop
  const drop_restaurants = drop_menu_items
    .then(() => {
      knex.schema.dropTable("restaurants").return();
    })
    .return();

  return Promise.all([
    drop_menu_items,
    drop_order_items,
    drop_menus,
    drop_items,
    drop_restaurants,
    drop_orders
  ]);
};

exports.down = function(knex, Promise) {

  const rebuild_restaurants_with_users_FK = knex.schema
    .createTable("restaurants", table => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("logo_url").notNullable();
      table.string("address").notNullable();
      table.string("phone_number").notNullable();
      table.time("open_time");
      table.time("close_time");
      // Addition Removed
    })
    .return();

  const rebuild_orders_with_users_FK = knex.schema
    .createTable("orders", table => {
      table.increments("id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("received_at");
      table.timestamp("completed_at");
      table.timestamp("pickup_at");
      table.float("total_price").unsigned();
      table.string("notes");
      table.string("name");
      table.string("phone").notNullable();
      // Fix from intial migrations
      table.integer("restaurant_id");
      table
        .foreign("restaurant_id")
        .references("id")
        .inTable("restaurants");
      // Addition Removed
    })
    .return();

  const rebuild_menus = knex.schema
    .createTable("menus", table => {
      // Menus schema
      table.increments("id");
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.time("start_time");
      table.time("end_time");
      table.integer("restaurant_id").unsigned();
      table
        .foreign("restaurant_id")
        .references("id")
        .inTable("restaurants");
    })
    .return();

    const rebuild_items = knex.schema.createTable("items", table => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("description");
      table.string("image_url");
      table.float("price").notNullable();
    });

  const rebuild_menu_items = knex.schema
    .createTable("menu_items", table => {
      // Menu_items schema
      table.increments('id')
      table.integer('menu_id')
      table.foreign('menu_id').references('id').inTable('menus');
      table.integer('item_id')
      table.foreign('item_id').references('id').inTable('items');
    })
    .return();

  const rebuild_line_items = knex.schema
    .createTable("order_items", table => {
      // line_items schema
      table.increments('id')
      table.integer('qty');
      table.integer('order_id')
      table.foreign('order_id').references('id').inTable('orders');
      table.integer('item_id')
      table.foreign('item_id').references('id').inTable('items');
    })
    .return();


  return Promise.all([
    rebuild_restaurants_with_users_FK,
    rebuild_orders_with_users_FK,
    rebuild_menus,
    rebuild_menu_items,
    rebuild_line_items,
    rebuild_items,
  ]);
};
