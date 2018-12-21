
exports.up = function(knex, Promise) {
  const createRestaurantsTable = knex.schema.createTable('restaurants', (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('logo_url').notNullable();
      table.string('address').notNullable();
      table.string('phone_number').notNullable();
      t.time('open_time');
      t.time('close_time');
  }).return()

  const createMenusTable = createRestaurantsTable
    .then( () => {
        return knex.schema.createTable('menus', (table) => {
            table.increments('id');
            table.string('name').notNullable();
            table.string('description').notNullable();
            table.time('start_time');
            table.time('end_time');
            table.integer('restrauntid').unsigned();
            table.foreign('id').references('restaurants')
        })
    })
  
  const createDishesTable = knex.schema.createTable('dishes', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('description');
    table.string('image_url');
    table.float('price').notNullable();
  })

  const createMenuItemsTable = Promise.all([
    createDishesTable, createMenusTable
  ]).then( () => {
    knex.schema.createTable('menu_items', (table) => {
      table.increments('id');
      table.integer('menu_id');
      table.foreign('id').references('menus');
      table.integer('menu_item_id');
      table.foreign('id').references('dishes');
    })
  })

  const createOrdersTable = knex.schema.createTable('orders', (table) => {
    table.increments('id');
    table.timestamp('created_at');
    table.timestamp('received_at')
    table.timestamp('completed_at');
    table.timestamp('pickup_at');
    table.float('total_price').unsigned();
    table.string('notes');
    table.string('name');
    table.string('phone').notNullable();
    table.integer('restaurant_id');
    table.foreign('id').references('restaurants');
  })

  const createLineItems = Promise.all([ createOrdersTable, createDishesTable ])
    .then( () => {
      knex.schema.createTable('line_items', (table) => {
        table.increments('id');
        table.integer('order_id');
        table.foreign('id').references('orders');
        table.integer('menu_item_id');
        table.foreign('id').references('menu_items');
        table.integer('qty').unsigned();
      })
    })
};

exports.down = function(knex, Promise) {
  
};
