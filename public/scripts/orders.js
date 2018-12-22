const $jq = jQuery.noConflict();

$jq(document).ready(() => {

  // Order toggle
  $jq('.order-head').click(function () {
    $jq(this).siblings().slideToggle('fast');
  });
});
