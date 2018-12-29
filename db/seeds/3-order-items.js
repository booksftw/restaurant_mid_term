
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order_items').del()
    .then(async function () {
      const orders = await knex('orders').pluck('id')
      const items = await knex('items').pluck('id')
      var i = 0;
      return await orders.map(async (orderId) => {
        return await items.map(async (itemId)=>{
          return knex('order_items').insert({order_id: orderId, item_id: itemId, qty: i++})
        })
      })

    });
};
