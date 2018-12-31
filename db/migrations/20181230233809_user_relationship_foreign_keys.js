exports.up = function(knex, Promise) {

  const rebuild_restaurants_with_users_FK = knex.schema
    .createTable("restaurants", table => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("logo_url").notNullable();
      table.string("address").notNullable();
      table.string("phone_number").notNullable();
      table.time("open_time");
      table.time("close_time");
      // Addition
      table.integer("user_id");
      table
        .foreign("user_id")
        .references("id")
        .inTable("users");
    })
    .return();

  const rebuild_orders_with_users_FK = rebuild_restaurants_with_users_FK.then(
    knex.schema
    .createTable("orders", table => {
      table.increments("id")
      table.timestamp("created_at").defaultTo(knex.fn.now())
      table.timestamp("received_at")
      table.timestamp("completed_at")
      table.timestamp("pickup_at")
      table.float("total_price").unsigned()
      table.string("notes")
      table.string("name")
      table.string("phone").notNullable()
      // Fix from intial migrations
      table.integer("restaurant_id")
      table
        .foreign("restaurant_id")
        .references("id")
        .inTable("restaurants")
      // Addition Removed
    })
    .return()
  );
  


  const rebuild_menus = rebuild_restaurants_with_users_FK.then(  
    knex.schema.createTable("menus", table => {
      // Menus schema
      table.increments("id")
      table.string("name").notNullable()
      table.string("description").notNullable()
      table.time("start_time")
      table.time("end_time")
      table.integer("restaurant_id").unsigned()
      table
        .foreign("restaurant_id")
        .references("id")
        .inTable("restaurants")
    })
    .return()
  );


  const rebuild_items = knex.schema.createTable("items", (table) => {
    table.increments("id")
    table.string("name").notNullable()
    table.string("description")
    table.string("image_url")
    table.float("price").notNullable()
  })
    .return()


  return Promise.all([
    rebuild_restaurants_with_users_FK,
    rebuild_orders_with_users_FK,
    rebuild_menus,
    rebuild_items,
  ]);
};

exports.down = function(knex, Promise) {
  const drop_items       = knex.schema.dropTable('items').return()
  const drop_menus       = knex.schema.dropTable('menus').return()
  const drop_orders      = knex.schema.dropTable('orders').return()
  const drop_restaurants = knex.schema.dropTable('restaurants').return()
  
  return Promise.all([
    drop_items,
    drop_menus,
    drop_orders,
    drop_restaurants,
  ])
};
