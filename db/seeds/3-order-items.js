
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('order_items').insert({order_id: 1, menu_item_id: 1, qty: 1}),
        knex('order_items').insert({order_id: 1, menu_item_id: 3, qty: 2}),
        knex('order_items').insert({order_id: 1, menu_item_id: 5, qty: 1}),
        knex('order_items').insert({order_id: 2, menu_item_id: 2, qty: 5}),
        knex('order_items').insert({order_id: 2, menu_item_id: 4, qty: 3}),
        knex('order_items').insert({order_id: 2, menu_item_id: 6, qty: 1}),
        knex('order_items').insert({order_id: 3, menu_item_id: 4, qty: 3}),
        knex('order_items').insert({order_id: 3, menu_item_id: 5, qty: 11}),
        knex('order_items').insert({order_id: 3, menu_item_id: 6, qty: 15})
      ]);
    });
};
