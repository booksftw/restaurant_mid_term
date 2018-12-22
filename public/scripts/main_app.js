// const $jq = JQuery.noConflict();

$(document).ready(() => {

  // $(".menu-item").on('click', function (event){
  //   console.log('hihi');
  // });

  function addToCart(order) {
    $('.item-added').append(createOrder(order));

  }


  function createOrder(order) {
    const $order = $("<div>").addClass('cart-item').html(`

      <div class="menu-text">
        <h3>breakfast</h3>
        <p>$12.99</p>
      </div>
      `);

    return $order;
  }

  $(".menu-item").on('click', (event)=>{
    console.log(this.value)

    addToCart();
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
