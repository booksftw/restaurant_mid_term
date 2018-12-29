const schemaTables = ['menus', 'items', 'menu_items', 'restaurants', 'orders', 'order_items'];

exports.seed = function(knex, Promise) {
  const deleteAllTables = knex.raw(`TRUNCATE ${schemaTables.join(',')} CASCADE`);
  return deleteAllTables.then( function(){
    return Promise.all([
      knex('restaurants').insert({name: 'Gio Cafe', logo_url:'https://cdn.websites.hibu.com/3446c3f773fc4983b12995f3adab4a82/dms3rep/multi/mobile/Cafe-Gio-logo.png', address:'201 Demacia st', phone_number:'123-456-7890', open_time: '07:00:00', close_time: '21:00:00' }),
      knex('menus').insert({name: 'Breakfast', description: 'breakfast menuz', start_time:'07:00:00', end_time: '21:00:00'}),
      knex('items').insert({name: 'Eggs', description: 'tasty in your mouth', image_url:"https://www.cbc.ca/inthekitchen/assets_c/2013/10/Steak'nEggs26-thumb-596x350-329015.jpg",price:12.00}),
      knex('items').insert({name: 'Pizza', description: 'Cheezy awesomeness', image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/220px-Eq_it-na_pizza-margherita_sep2005_sml.jpg",price:15.00}),
      knex('items').insert({name: 'Burgers', description: 'Yum', image_url:"https://media.mnn.com/assets/images/2017/06/sonic_mushroom_beef_burger.jpg.653x0_q80_crop-smart.jpg",price:12.99}),
    ]);
  })
}
