
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('orders').insert({total_price: 12.99, notes: '', name: 'Greg', phone: '1111111111'}),
        knex('orders').insert({total_price: 15.99, notes: 'allergic to onions', name: 'Fred', phone: '2222222222'}),
        knex('orders').insert({total_price: 11.99, notes: 'gluten free', name: 'Sam', phone: '3333333333'}),
        knex('orders').insert({total_price: 12.99, notes: '', name: 'Steve', phone: '4444444444'}),
        knex('orders').insert({total_price: 15.99, notes: '', name: 'Kim', phone: '5555555555'}),
        knex('orders').insert({total_price: 11.99, notes: 'Thank you!', name: 'Deryk', phone: '6666666666'}),
        knex('orders').insert({total_price: 12.99, notes: '', name: 'Bob', phone: '7777777777'}),
        knex('orders').insert({total_price: 15.99, notes: '', name: 'Susan', phone: '8888888888'}),
        knex('orders').insert({total_price: 11.99, notes: 'gluten free', name: 'Lina', phone: '9999999999'})
      ]);
    });
};
