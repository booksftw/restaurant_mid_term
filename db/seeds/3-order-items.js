
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('line_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('line_items').insert({id: 1, order_id: 1, menu_item_id: 1, qty: 1}),
        knex('line_items').insert({id: 2, order_id: 1, menu_item_id: 3, qty: 2}),
        knex('line_items').insert({id: 3, order_id: 1, menu_item_id: 5, qty: 1}),
        knex('line_items').insert({id: 4, order_id: 2, menu_item_id: 2, qty: 5}),
        knex('line_items').insert({id: 5, order_id: 2, menu_item_id: 4, qty: 3}),
        knex('line_items').insert({id: 6, order_id: 2, menu_item_id: 6, qty: 1}),
        knex('line_items').insert({id: 7, order_id: 3, menu_item_id: 4, qty: 3}),
        knex('line_items').insert({id: 8, order_id: 3, menu_item_id: 5, qty: 11}),
        knex('line_items').insert({id: 9, order_id: 3, menu_item_id: 6, qty: 15})
      ]);
    });
};
