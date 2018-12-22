exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert({id: 1, name: 'Gio Cafe'}),
        knex('restaurants').insert({id: 2, name: 'Bob'}),
        knex('restaurants').insert({id: 3, name: 'Charlie'})
      ]);
    });
};
