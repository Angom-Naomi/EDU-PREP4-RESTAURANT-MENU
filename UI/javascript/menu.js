                //SEARCH BAR
function search(){
    var item = document.getElementById("searchBox").value;
    if (item===" "){
        alert("Enter your search...")
        return false;
    }
    else {
        alert("Your" + " " + item + " " + "is here...")
    }
};


        //MAKE ORDER
//First load the DOM document 
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} 
else {
    ready();
}

//Activate buttons when the dom content load is ready
function ready() {

    var removeButtons = document.getElementsByClassName('remove-btn');
    for(var r = 0; r < removeButtons.length; r++) {
        var button = removeButtons[r];
        button.addEventListener('click', removeFromMenu); 
    }
​
    var qnty = document.getElementsByClassName('order-qnty');
    for(var q = 0; q < qnty.length; q++) {
        var input = qnty[q];
        input.addEventListener('change', changeQnty);
​   }

    var addButtons = document.getElementsByClassName('addBtn');
    for(var x = 0; x < addButtons.length; x++) {
        var button = addButtons[x];
        button.addEventListener('click', addToMenu);
         }

    document.getElementsByClassName('orderBtn')[0].addEventListener('click', makeOrder);
};

// The functions
​
// the purchase button
function makeOrder(event) {
    alert('Gracias! Come again next time');
    var item = document.getElementsByClassName('order-item')[0]
    // continue to execute while what is inside () is true
    while (item.hasChildNodes()) {
        item.removeChild(item.firstChild);
    }
    myTotal()
};
​
// quantity input changes in menu
function changeQnty(event) {
   var input = event.target;
    if(isNaN(input.value) ||  input.value <= 0){        // check if input value is not a number and is not less than or equal to zero
        input.value = 1;              // set the lowest input value
    }    
    myTotal()
};
​
// remove items from menu
function removeFromMenu(event) { 
​    var btn = event.target;
    // the button is inside two parent elements
    btn.parentElement.parentElement.remove();
    myTotal()
};
​
// add items to menu
function addToMenu(event) {
    var button = event.target;
    var addItem = button.parentElement.parentElement;
    // get the text inside the element
    var title = addItem.getElementsByClassName('item')[0].innerText;
    var price = addItem.getElementsByClassName('price')[0].innerText;
    // htis is the add item cart METHOD
    addToMenu(title, price);
    myTotal()
};

// add items to menu
function addItemToCart(item, price) {
    // create a row for our menu items / new div
    var orderRow = document.createElement('div');
    orderRow.classList.add('order-row');
    // add a row to cmenu items
    var orderItems = document.getElementsByClassName('order-item')[0];
​
    // this is code to check if an items has already been added to menu
    var orderItemNames = orderItems.getElementsByClassName('order-item-title');
    for(var i = 0; i < orderItemNames.length; i++) {
        if (orderItemNames[i].innerText == title) {
            alert('This item already exists on your menu!');
            // exit function and stop executing code below it, bringing you back to start if add item function
            return 
        }
        
    }
​
    // add order row to the very end of the order items / use copied html (order-row contents) to generate an order row / using back ticks (``) so we can use our string on different lines
    var  orderRowContents = `
        <div class="order-row">
                <span class="order-item order-header order-column">${title}</span>
                <span class="order-price order-header order-column">${price}</span>
                <span class="order-qnty order-header order-column">Quantity</span>
                <button type="button" class="btn removeBtn" onclick="removeFromMenu(event)">remove</button>         
        </div>`
    // ${ } is used to store varibales directly into our code 
    // anything insde of it will be a variable that will evaluate
    // we use innerhtml because we are using html tags inside here
    orderRow.innerHTML = orderRowContents;
    orderItems.append(orderRow); 
    // can remove added items
    orderRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeFromMenu);
    // total will update with each added item
    orderRow.getElementsByClassName('order-quantity-input')[0].addEventListener('change', changeQnty)
​
}
​
​
// update order total function
function theTotal() {
    // select first element in array as our cart item container
    var orderItemContainer = document.getElementsByClassName('order-item')[0];
    // only gets element inside of the object with the specified class;
    var cartRows = orderItemContainer.getElementsByClassName('order-row')
    var total = 0;
    
    for (var i =0; i < orderRows.length; i++) {
        var orderRow = orderRows[i];
        // get row price
        var px = orderRow.getElementsByClassName('order-price')[0];
        // get row quantity
        var qunty = orderRow.getElementsByClassName('order-quantity-input')[0];
        // get the price from price element, change string to number value with decimals, remove UGX from our string
        var price = parseFloat(px.innerText.replace('Ugshs', ''));
        // get quantity from our quantity element
        var quantity = qunty.value;
        // calculating total price, will do each iteration
        total = total + (price * quantity);
    }
    // round off total to two decimal places
    total = Math.round(total * 100) / 100;
    // get order-total-price element, set inner text of element to total
    document.getElementsByClassName('order-total-price')[0].innerText = 'Ugshs' + total;
}






