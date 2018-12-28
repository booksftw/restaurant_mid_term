
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('orders').insert({id: 1, total_price: 12.99, notes: '', name: 'Greg', phone: '5555555555', restaurant_id: 1}),
        knex('orders').insert({id: 2, total_price: 15.99, notes: 'allergic to onions', name: 'Fred', phone: '1111111111', restaurant_id: 1}),
        knex('orders').insert({id: 3, total_price: 11.99, notes: 'gluten free', name: 'Sam', phone: '2222222222', restaurant_id: 1})
      ]);
    });
};