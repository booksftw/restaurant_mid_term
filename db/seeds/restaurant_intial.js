exports.seed = function(knex, Promise) {
  return knex('restaurants').del()
  .then(function () {

    return Promise.all([
      // ? Omit id makes each new insert an increment id
      knex('restaurants').insert({id:1, name: 'Gio Cafe', logo_url:'https://cdn.websites.hibu.com/3446c3f773fc4983b12995f3adab4a82/dms3rep/multi/mobile/Cafe-Gio-logo.png', address:'201 Demacia st', phone_number:'123-456-7890', open_time: '07:00:00', close_time: '21:00:00' }),
      knex('menus').insert({id:1, name: 'Breakfast', description: 'breakfast menu', start_time:'07:00:00', end_time: '21:00:00', restrauntid: 1,  }),
      knex('dishes').insert({name: 'Eggs', description: 'tasty in your mouth', image_url:"https://www.cbc.ca/inthekitchen/assets_c/2013/10/Steak'nEggs26-thumb-596x350-329015.jpg",price:12.00}),
      knex('dishes').insert({name: 'Pizza', description: 'Cheezy awesomeness', image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/220px-Eq_it-na_pizza-margherita_sep2005_sml.jpg",price:15.00}),
      knex('dishes').insert({name: 'Burgers', description: 'Yum', image_url:"https://media.mnn.com/assets/images/2017/06/sonic_mushroom_beef_burger.jpg.653x0_q80_crop-smart.jpg",price:12.99}),
    ]);
  })
  .then(() => {
    // * Enables autoincrement up to 10 for each table
    // *
    return knex.raw("ALTER SEQUENCE restaurants_id_seq RESTART WITH 10")
  })

  };
