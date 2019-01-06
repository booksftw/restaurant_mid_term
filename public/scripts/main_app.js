// const $jq = JQuery.noConflict();

$(document).ready(() => {

  // $(".menu-item").on('click', function (event){
  //   console.log('hihi');
  // });

  $('.cart').on('click', '.remove', function(item){
    $(this).parent().parent().parent().remove();
  });


  function addToCart(menuItem) {
    $('.item-added').append(createOrder(menuItem));
    $('.sub')[0].innerHTML = (Number($('.sub')[0].innerHTML) + menuItem.price).toFixed(2);
    $('.tax')[0].innerHTML = ((Number($('.sub')[0].innerHTML) + menuItem.price) * 0.05).toFixed(2);
    $('.tot')[0].innerHTML = (Number($('.sub')[0].innerHTML) + Number($('.tax')[0].innerHTML)).toFixed(2);
  }

  var itemNo = 0;

  function createOrder(menuItem) {
    const $order = $("<div>").addClass('cart-item').html(`
      <div class="menu-text" data-item-id="${menuItem.id}">
        <p><em>${menuItem.name}</em><span class="remove"><i class="fas fa-minus-circle"></i></span></p>
        <p>$ ${Number(menuItem.price)}</p>
        <input type="hidden" name="items[${itemNo}][item_id]" value="${menuItem.id}"/>
        <input type="hidden" name="items[${itemNo}][qty]" value="${menuItem.qty}"/>
      </div>
      `);
      itemNo++;
    return $order;
  }

  // $(".menu-item").on('submit', function(event){
  //   const menuName = $(this).find('.menu-name')[0].innerHTML;
  //   const menuPrice = $(this).find('.menu-price')[0].innerHTML;
  //   // console.log($(this).find('.menu-name')[0].innerHTML)
  //   // console.log($(this).find('.menu-price')[0].innerHTML)

  //   addToCart(menuName, menuPrice);
  // });

  $('.menu-button').on('click', function(e){
    const menuItemId = $(this).parent().parent().parent().data('id');
    let menuItem = window.menuItems[menuItemId][0];
    const menuName = $(this).parent().parent().find('.menu-name')[0].innerHTML;
    const menuQty = $(this).parent().find('.qty')[0].value;
    const menuPrice = $(this).parent().find('.menu-price')[0].innerHTML * menuQty;
    menuItem.qty = menuQty;
    menuItem.price = menuPrice;

    if(menuPrice) {
      addToCart(menuItem);
    }
  });

  // $('#checkout').submit(function (e) {
  //   // e.preventDefault();
  //   console.log(this);
  //   let order = {};
  //
  // });

  $('.checkout').on('click', function(e){
    var restrId = $(this).attr('data-restr-id')
    window.location.href = `/shop/${restrId}/checkout_success`;
  });

  // $(".menu-item").on("click", function(event) {
  //   event.preventDefault();

  //   $.ajax({
  //     type: "POST",
  //     url: '/',
  //     data: createOrder,
  //     success: function(result){
  //       addToCart();
  //     }
  //   });
  // });
});
