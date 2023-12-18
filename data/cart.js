export let cart = JSON.parse(localStorage.getItem('cart')) 

if (!cart) {
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryoptionid: '2',
    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        deliveryoptionid: '1',
        quantity: 1
    }];
}

function savetostorage() {
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart(productId)   {
    let matchingItem;

    cart.forEach((item) => {
        if (productId === item.productId ) {
            matchingItem = item;
        } 
    });

    if(matchingItem)    {
        matchingItem.quantity+=1;
    } else {
        cart.push({
            productId: productId,
            quantity:1,
            deliveryoptionid: '1'
        });
    }
    savetostorage();
}

export function removefromcart(productId) {
    const newCart = [];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    savetostorage();
}

export function updatedeliveryoption(productId, deliveryoptionid) {
    let matchingItem;

    cart.forEach((item) => {
        if (productId === item.productId ) {
            matchingItem = item;
        } 
    });

    matchingItem.deliveryoptionid = deliveryoptionid;
    savetostorage();
}