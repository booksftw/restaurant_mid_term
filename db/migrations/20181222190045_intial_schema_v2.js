exports.up = async function(knex, Promise) {
  const createRestaurantsTable = knex.schema.createTable('restaurants', (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('logo_url').notNullable();
      table.string('address').notNullable();
      table.string('phone_number').notNullable();
      table.time('open_time');
      table.time('close_time'); 
  }).return()

  const createMenusTable = ( async() => {
    await createRestaurantsTable;
    await knex.schema.createTable('menus', (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.time('start_time')
      table.time('end_time');
      table.integer('restaurantid').unsigned();
      table.foreign('id').references('restaurants')
    });
  })();

  const createDishesTable = knex.schema.createTable('dishes', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('description');
    table.string('image_url');
    table.float('price').notNullable();
  }).return()

  
  const createMenuItemsTable = (async () => {
    await createDishesTable;
    await createMenusTable;
    await knex.schema.createTable('menu_items', (table) => {
      table.increments('id');
      table.integer('menu_id');
      table.foreign('id').references('menus');
      table.integer('menu_item_id');
      table.foreign('id').references('dishes');
    });
  })();

  const createOrdersTable = knex.schema.createTable('orders', (table) => {
    table.increments('id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('received_at')
    table.timestamp('completed_at');
    table.timestamp('pickup_at');
    table.float('total_price').unsigned();
    table.string('notes');
    table.string('name');
    table.string('phone').notNullable();
    table.integer('restaurant_id');
    table.foreign('id').references('restaurants');
  }).return()

  const createLineItems = (async () => {
    await createOrdersTable;
    await createDishesTable;
    await knex.schema.createTable('line_items', (table) => {
      table.increments('id');
      table.integer('order_id');
      table.foreign('id').references('orders');
      table.integer('menu_item_id');
      table.foreign('id').references('menu_items');
      table.integer('qty').unsigned();
    })
  })();

  await Promise.all([createLineItems, createOrdersTable ,createMenuItemsTable, createDishesTable, createMenusTable, createRestaurantsTable]);
};

exports.down = function(knex, Promise) {
  const dropMenuItemsTable = knex.schema.dropTable('menu_items').return();
  const dropLineItemsTable = knex.schema.dropTable('line_items').return();
  
  const dropMenusTable  = dropMenuItemsTable.then( () => knex.schema.dropTable('menus').return() )
  const dropOrdersTable = dropLineItemsTable.then( () => knex.schema.dropTable('orders').return() )

  const dropRestaurantTable = Promise.all([
      dropMenuItemsTable,
      dropLineItemsTable,
      dropMenusTable,
      dropOrdersTable
  ]).then( () => knex.schema.dropTable('restaurants').return()  )
  
  const dropDishesTable = Promise.all([
    dropMenuItemsTable,
    dropLineItemsTable,
    dropMenusTable,
    dropOrdersTable
  ]).then( () => { knex.schema.dropTable('dishes').return() } )

  return Promise.all([
      dropMenuItemsTable,
      dropLineItemsTable,
      dropMenusTable,
      dropOrdersTable,
      dropRestaurantTable,
      dropDishesTable
  ])

};
