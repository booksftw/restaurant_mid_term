// const $jq = JQuery.noConflict();

$(document).ready(() => {

  // $(".menu-item").on('click', function (event){
  //   console.log('hihi');
  // });

  $('.cart').on('click', '.remove', function(item){
    $(this).parent().parent().parent().remove();
  });


  function addToCart(menuName, menuPrice) {
    $('.item-added').append(createOrder(menuName, menuPrice));
    $('.sub')[0].innerHTML = (Number($('.sub')[0].innerHTML) + menuPrice).toFixed(2);
    $('.tax')[0].innerHTML = ((Number($('.sub')[0].innerHTML) + menuPrice) * 0.05).toFixed(2);
    $('.tot')[0].innerHTML = (Number($('.sub')[0].innerHTML) + Number($('.tax')[0].innerHTML)).toFixed(2);
  }


  function createOrder(menuName, menuPrice) {
    const $order = $("<div>").addClass('cart-item').html(`

      <div class="menu-text">
        <p><em>${menuName}</em><span class="remove"><i class="fas fa-minus-circle"></i></span></p>
        <p>$ ${Number(menuPrice)}</p>
      </div>
      `);

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
    const menuName = $(this).parent().parent().find('.menu-name')[0].innerHTML;
    const menuQty = $(this).parent().find('.qty')[0].value;
    const menuPrice = $(this).parent().find('.menu-price')[0].innerHTML * menuQty;

    if(menuPrice) {
      addToCart(menuName, menuPrice);
    }
  })

  $('#checkout').submit(function (e) {
    e.preventDefault();
    console.log(this);
  })

  $('.checkout').on('click', function(e){
    var restrId = $(this).attr('data-restr-id')
    window.location.href = `/shop/${restrId}/checkout_success`;
  })

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
