
exports.up = function(knex, Promise) {

const addUsers = knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('role');
}).return();

// * Drop dependency for Restaurants and Orders 
const drop_menus = knex.schema.dropTable('menus').return();
const drop_menu_items = knex.schema.dropTable('menu_items').return();
const drop_line_items = knex.schema.dropTable('line_items').return();

const drop_restraunts = Promise.all([
    drop_menus,
    drop_menu_items,
    drop_orders
    ]).then( () => {
    return knex.schema.dropTable('restaurants').return();
})


const drop_orders = drop_line_items.then( () => {
    return knex.schema.dropTable('orders').return()
})

const rebuild_restaurants_with_users_FK = drop_restraunts.then( () => {
return knex.schema.createTable('restaurants', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('logo_url').notNullable();
    table.string('address').notNullable();
    table.string('phone_number').notNullable();
    table.time('open_time');
    table.time('close_time'); 
    // Addition
    table.string('user_id');
    table.foreign('user_id').references('id').inTable('users')
    }).return()
})

const rebuild_orders_with_users_FK = knex.schema.createTable('orders', (table) => {
    table.increments('id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('received_at')
    table.timestamp('completed_at');
    table.timestamp('pickup_at');
    table.float('total_price').unsigned();
    table.string('notes');
    table.string('name');
    table.string('phone').notNullable();
    // Fix from intial migrations
    table.integer('restaurant_id');
    table.foreign('restaurant_id').references('id').inTable('restaurants');
    // Addition
    table.string('user_id');
    table.foreign('user_id').references('id').inTable('users')
}).return()

const rebuild_menus = knex.schema.createTable('menus', (table) => {
    // Menus schema
})

const menu_items = knex.schema.createTable('menu_items', (table) => {
    // Menu_items schema
})

const line_items = knex.schema.createTable('line_items', (table) => {
    // line_items schema
})



return Promise.all([
    addUsers,
    drop_restraunts,
    rebuild_restaurants_with_users_FK,
    drop_orders,
    rebuild_orders_with_users_FK
])

};

exports.down = function(knex, Promise) {
const dropUsers = knex.schema.dropTable('users').return();

const drop_restaurants = knex.schema.dropTable('restaurants').return();
const rebuild_restaurants_as_before = knex.schema.table('restaurants', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('logo_url').notNullable();
    table.string('address').notNullable();
    table.string('phone_number').notNullable();
    table.time('open_time');
    table.time('close_time'); 
}).return();

const drop_orders = knex.schema.dropTable('orders').return();
const rebuild_orders_as_before = knex.schema.table('orders', (table) => {
    table.increments('id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('received_at')
    table.timestamp('completed_at');
    table.timestamp('pickup_at');
    table.float('total_price').unsigned();
    table.string('notes');
    table.string('name');
    table.string('phone').notNullable();
    // Fix from intial migrations
    table.integer('restaurant_id');
    table.foreign('restaurant_id').references('id').inTable('restaurants');
}).return();

return Promise.all([
    dropUsers,
    drop_restaurants,
    rebuild_restaurants_as_before,
    drop_orders,
    rebuild_orders_as_before
])
};
