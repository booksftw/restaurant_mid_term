
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
};

exports.down = function(knex, Promise) {
  
};
