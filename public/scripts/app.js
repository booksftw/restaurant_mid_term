const $jq = jQuery.noConflict();

$jq(document).ready(() => {

  // Order toggle
  $jq('.order-head').click(() => {
    $jq('.order-head').siblings().slideToggle('fast');
  });
});
