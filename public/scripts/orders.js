const $jq = jQuery.noConflict();

$jq(document).ready(() => {

  function renderOrders (orderData) {
    const $new = $jq('.new-orders');
    const $inProgress = $jq('.in-progress-orders');
    const $completed = $jq('.completed-orders');

    $jq.each(orderData, (i) => {
      if (orderData[i].receivedAt === null && orderData[i].completedAt === null && orderData[i].pickupAt === null) {
        $new.append(createOrderElement(orderData[i]));
      } else if (orderData[i].completedAt === null && orderData[i].pickupAt === null) {
        $inProgress.append(createOrderElement(orderData[i]));
      } else if (orderData[i].pickupAt === null) {
        $completed.append(createOrderElement(orderData[i]));
      }
    });

  }

  function createOrderElement (order) {
    let $orderContainer = $jq('<div>').addClass('order');
    let $orderHeader = $jq('<div>').addClass('order-head order-contact');
    let $orderContent = $jq('<div>').addClass('order-details');
    let $orderItems = $jq('<div>').addClass('order-items');
    let $itemList = $jq('<ul>').addClass('item-list');
    let $orderButtons = $jq('<div>').addClass('order-buttons');

    $orderHeader.append(`
      <span>${order.id}</span>
      <span>${order.name}</span>
      <span>${order.phone}</span>
    `);

    $jq.each(order.item, (j) => {
      $itemList.append(`<li>${order.item[j].qty} x ${order.item[j].name}</li>`);
    });

    $orderItems.append(`
      <ul class="item-list">
        ${$itemList.html()}
      </ul>
      <p>
        <span>Comments:</span><br />
        ${order.notes}
      </p>
    `);

    $orderButtons.append(`
      <form>
        <input type="button" class="btn btn-primary btn-sm btn-round confirm-order" value="Confirm" />
        <input type="button" class="btn btn-danger btn-sm btn-round cancel-order" value="Cancel" />
      </form>
    `);

    $orderContent.append($orderItems, $orderButtons);
    $orderContainer.append($orderHeader, $orderContent);

    return $orderContainer;

  }

  $jq.getJSON('/orders', (data) => {
    renderOrders(data);
  });

  // Order toggle
  $jq('.order-head').click(function () {
    $jq(this).siblings().slideToggle('fast');
  });
});
