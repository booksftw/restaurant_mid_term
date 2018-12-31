
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({email: 'restr', password: 'restr', role:"owner"}),
        knex('users').insert({email: 'cust', password: 'cust', role:"customer"}),
      ]);
    });
};
