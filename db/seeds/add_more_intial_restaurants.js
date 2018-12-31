
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurants')
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('restaurants').insert({name: 'JimYung Forever Healthy Foods', logo_url: 'https://www.wholefoodsmarket.com/sites/default/files/media/HSH-Circle-Color_1.jpg', address:'Live long and prosper street', phone_number: 780-111-1111, open_time: '08:00:00' ,close_time: '22:00:00' })
      ]);
    });
};
