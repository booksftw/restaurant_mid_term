
exports.seed = function(knex, Promise) {

  return Promise.all([
    // Inserts seed entries
    knex('items').insert({name: "Gio's Hearty Breakfas", description: "Two eggs any style, your choice of bacon, back bacon, sausage or chorizo, & your choice of toast, buttermilk pancakes or a half waffle. Served with endless smashbrown potatoes.", image_url: "https://cdad5c1a4432622c031d-9e2498b30009308de15a0d52a7422974.ssl.cf1.rackcdn.com/menu/product/hearty-nine-grain-pancake-breakfast_thumbnaillarge_2018-04-02-03-08-00.jpg", price: 18 }),
    knex('items').insert({name: "Breakfast Quesadilla", description: "Mushrooms, fresh spinach, three cheeses, green onions & scrambled eggs. Served with cilantro sour cream & strawberry pico de gallo. Add bacon or chorizo sausage", image_url: "http://cdn1.thegourmetbachelor.com/wp-content/uploads/2010/12/TGB_Breakfast_Quesadilla1.jpg", price: 15 }),
    knex('items').insert({name: "Oatmeal & Quinoa", description: "Sundried cranberries & toasted almonds. Served with fresh fruit.", image_url: "https://foodal.com/wp-content/uploads/2017/10/The-Best-Hot-Breakfast-Cereal-with-Strawberries-and-Nuts.jpg", price: 11 })
  ]).then( () => {
    // * Enables autoincrement up to 10 for each table
    // return knex.raw("ALTER SEQUENCE restaurants_id_seq RESTART WITH 10")
  });
};
