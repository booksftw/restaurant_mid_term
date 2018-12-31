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

  const rebuild_orders_with_users_FK = drop_menu_items.then(table => {
    knex.schema
      .createTable("orders", table => {
        table.increments("id");
        const rebuild_items = knex.schema.createTable("items", () => {
          table.increments("id");
          table.string("name").notNullable();
          table.string("description");
          table.string("image_url");
          table.float("price").notNullable();
        });
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
        // Addition
        table.string("user_id");
        table
          .foreign("user_id")
          .references("id")
          .inTable("users");
      })
      .return();
  });

  const rebuild_menus = drop_menu_items.then(table => {
    knex.schema
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
  });

  const rebuild_menu_items = drop_menu_items.then(table => {
    knex.schema
      .createTable("menu_items", table => {
        // Menu_items schema
        table.integer("menu_id");
        table
          .foreign("menu_id")
          .references("id")
          .inTable("menus");
        table.integer("item_id");
        table
          .foreign("item_id")
          .references("id")
          .inTable("items");
        table.primary(["menu_id", "item_id"]);
      })
      .return();
  });

  const rebuild_order_items = drop_menu_items.then(() => {
    knex.schema
      .createTable("order_items", table => {
        // line_items schema
        table.increments("id");
        table.integer("qty");
        table.integer("order_id");
        table
          .foreign("order_id")
          .references("id")
          .inTable("orders");
        table.integer("item_id");
        table
          .foreign("item_id")
          .references("id")
          .inTable("items");
        table.primary(["order_id", "item_id"]);
      })
      .return();
  });

  const rebuild_items = knex.schema.createTable("items", () => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("description");
    table.string("image_url");
    table.float("price").notNullable();
  });

  return Promise.all([rebuild_restaurants_with_users_FK]);
};

exports.down = function(knex, Promise) {};
