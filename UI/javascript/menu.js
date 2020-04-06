
            // FOOD MENU
//First load the document/DOM 
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} 
else {
    ready();
};

//When the document loads
function ready() {
    var removeButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeButtons.length; i++) {
        var button = removeButtons[i];
        button.addEventListener('click', removeItem );
    }

    var quantityInputs = document.getElementsByClassName('order-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged );
    }

    var addButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addButtons.length; i++) {
        var button = addButtons[i];
        button.addEventListener('click', addItem );
    }

    document.getElementsByClassName('btn-makeOrder')[0].addEventListener('click', makeOrder );
};

                //FUNCTIONS AT WORK
function makeOrder() {
    alert('Gracias! Come again soon and thank you.');
    var orderItems = document.getElementsByClassName('order-items')[0];
    while (orderItems.hasChildNodes()) {
        orderItems.removeChild(orderItems.firstChild);
    }
    updateTotal();
}

function removeItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();
};

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {  //quantity should not be 0 or negative
        input.value = 1;
    }
    updateTotal();
};

function addItem(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToOrder(title, price, imageSrc);  //new function to add items to make order
    updateTotal();
};

function addItemToOrder(title, price, imageSrc) {
    var orderRow = document.createElement('div');  //create a new div for make order
    orderRow.classList.add('order-row');
    var orderItems = document.getElementsByClassName('order-items')[0];
    var orderItemNames = orderItems.getElementsByClassName('order-item-title');
    for (var i = 0; i < orderItemNames.length; i++) {
        if (orderItemNames[i].innerText == title) {
            alert('This item is already added to the cart');  //if item appears more than once
            return;
        }
    }
    //variable to hold the whole new HTML div
    var orderRowContents = `
        <div class="order-item order-column">
            <img class="order-item-image" src="${imageSrc}" width="100px" height="100px">
            <span class="order-item-title">${title}</span>
        </div>
        <span class="order-price order-column">${price}</span>
        <div class="order-quantity order-column">
            <input class="order-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Remove</button>
        </div>`
    orderRow.innerHTML = orderRowContents;
    orderItems.append(orderRow);
    orderRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem);
    orderRow.getElementsByClassName('order-quantity-input')[0].addEventListener('change', quantityChanged);
};

//Clear/refresh table after user makes order
function updateTotal() {
    var orderItemContainer = document.getElementsByClassName('order-items')[0];
    var orderRows = orderItemContainer.getElementsByClassName('order-row');
    var total = 0;
    for (var i = 0; i < orderRows.length; i++) {
        var orderRow = orderRows[i];
        var priceElement = orderRow.getElementsByClassName('order-price')[0];
        var quantityElement = orderRow.getElementsByClassName('order-quantity-input')[0];
        var price = parseInt(priceElement.innerText.replace('Ugx', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    document.getElementsByClassName('order-total-price')[0].innerText = total + " " + "Ugx";
};