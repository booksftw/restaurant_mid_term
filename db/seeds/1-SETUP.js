const schemaTables = ['menus', 'items', 'menu_items', 'restaurants', 'orders', 'order_items'];

exports.seed = function(knex, Promise) {
  const deleteAllTables = knex.raw(`TRUNCATE ${schemaTables.join(',')} CASCADE`);
  return deleteAllTables.then( function(){
    return Promise.all([
      knex('restaurants').insert({name: 'Gio Cafe', logo_url:'https://cdn.websites.hibu.com/3446c3f773fc4983b12995f3adab4a82/dms3rep/multi/mobile/Cafe-Gio-logo.png', address:'201 Demacia st', phone_number:'123-456-7890', open_time: '07:00:00', close_time: '21:00:00' }),
      knex('menus').insert({name: 'Breakfast', description: 'breakfast menuz', start_time:'07:00:00', end_time: '21:00:00'})

    ]);
  })
}
