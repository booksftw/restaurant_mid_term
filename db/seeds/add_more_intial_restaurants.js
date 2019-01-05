
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurants')
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('restaurants').insert({name: 'JimYung Forever Healthy Foods', logo_url: 'https://www.wholefoodsmarket.com/sites/default/files/media/HSH-Circle-Color_1.jpg', address:'Live long and prosper street', phone_number: 780-111-1111, open_time: '08:00:00' ,close_time: '22:00:00' }),
        knex('restaurants').insert({name: 'Nick Space Food', logo_url: 'https://i.ytimg.com/vi/6vVle67Tfjc/maxresdefault.jpg', address:'Blackhole-911', phone_number: 780-123-0000, open_time: '11:00:00' ,close_time: '05:00:00' })
      ]);
    });
};
