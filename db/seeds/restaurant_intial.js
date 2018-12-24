exports.seed = function(knex, Promise) {

  /**
   * 
   * ~ You're connecting promises to clear the menu table then the empty menu table
   * ~ You can refactor this using async and await maybe, or include Promise.all
   * ~ There may be areas that you can make more dynamic and DRY
   * ~ A new thought is that you might be able to wrap everything in Promise.all
   * ~ Another thought is that you can pull in the schema table columns for a table and clear them that way dynamiclly.
   * 
   * ~In progress: Make table clear dyanamic.
   */

  
  const schemaTables = ['menus', 'dishes', 'menu_items', 'restaurants', 'orders', 'line_items']

  const deleteAllTables = new Promise( function(resolve, reject) {
    schemaTables.forEach( (tableName , i) => {
      //* Delete all tables rows
       const emptyMenus = knex.select().table(tableName)
       .whereIn('id',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])
       .del().return();

      if (i + 1 === schemaTables.length) {
        resolve(true);
      }
    })
  })


    return deleteAllTables.then( () => {
      return Promise.all([
        // ? Omit id makes each new insert an increment id
        knex('restaurants').insert({id:1, name: 'Gio Cafe', logo_url:'https://cdn.websites.hibu.com/3446c3f773fc4983b12995f3adab4a82/dms3rep/multi/mobile/Cafe-Gio-logo.png', address:'201 Demacia st', phone_number:'123-456-7890', open_time: '07:00:00', close_time: '21:00:00' }),
        knex('menus').insert({id:1, name: 'Breakfast', description: 'breakfast menuz', start_time:'07:00:00', end_time: '21:00:00', restaurantid: 1,  }),
        knex('dishes').insert({id: 1, name: 'Eggs', description: 'tasty in your mouth', image_url:"https://www.cbc.ca/inthekitchen/assets_c/2013/10/Steak'nEggs26-thumb-596x350-329015.jpg",price:12.00}),
        knex('dishes').insert({id: 2, name: 'Pizza', description: 'Cheezy awesomeness', image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/220px-Eq_it-na_pizza-margherita_sep2005_sml.jpg",price:15.00}),
        knex('dishes').insert({id: 3, name: 'Burgers', description: 'Yum', image_url:"https://media.mnn.com/assets/images/2017/06/sonic_mushroom_beef_burger.jpg.653x0_q80_crop-smart.jpg",price:12.99}),
      ]);
    })
    .then(() => {
      // * Enables autoincrement up to 10 for each table
      // *
      return knex.raw("ALTER SEQUENCE restaurants_id_seq RESTART WITH 10")
    })



  }



  
