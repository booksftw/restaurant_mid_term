const $jq = jQuery.noConflict();

$jq(document).ready(() => {

  function createOrderElement (order) {
    
  }

  $jq.getJSON('/orders', (data) => {
    console.log('Data:', data);
  });

  // Order toggle
  $jq('.order-head').click(function () {
    $jq(this).siblings().slideToggle('fast');
  });
});
