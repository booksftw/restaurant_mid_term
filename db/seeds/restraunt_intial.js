exports.seed = function(knex, Promise) {
<<<<<<< HEAD
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert({id: 1000001, name: 'Gio Cafe'}),
        knex('restaurants').insert({id: 2, name: 'Bob'}),
        knex('restaurants').insert({id: 3, name: 'Charlie'})
      ]);
    });
};
=======
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert({id: 1, name: 'Gio Cafe', logo_url:'', address:'', phone_number:''}),
        knex('menus').insert({id: 1, name: 'Breakfast', description: 'breakfast menu', restrauntid: 1}),
        knex('dishes').insert({id: 1, name: 'Eggs', description: 'tasty in your mouth', image_url:"https://www.cbc.ca/inthekitchen/assets_c/2013/10/Steak'nEggs26-thumb-596x350-329015.jpg",price:12.00}),
        knex('dishes').insert({id: 2, name: 'Pizza', description: 'Cheezy awesomeness', image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/220px-Eq_it-na_pizza-margherita_sep2005_sml.jpg",price:15.00}),
        knex('dishes').insert({id: 3, name: 'Burgers', description: 'Yum', image_url:"https://media.mnn.com/assets/images/2017/06/sonic_mushroom_beef_burger.jpg.653x0_q80_crop-smart.jpg",price:12.99}),
      ]);
    })
    .then(() => {
      // * Enables autoincrement up to 10 for each table
      // *
      return knex.raw("ALTER SEQUENCE restaurants_id_seq RESTART WITH 10")
      // return knex.raw("ALTER SEQUENCE restaurants_id_seq RESTART WITH (SELECT MAX(id) FROM restaurants)")
    })
  };
>>>>>>> feature/migrate-intial-schema
