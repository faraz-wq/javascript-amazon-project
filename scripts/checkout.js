import {cart, removefromcart} from '../data/cart.js';
import { products } from '../data/products.js';
import {formatcurrency} from './utils/money.js';

let checkoutHTML = ``;
cart.forEach(item => {
    const productId = item.productId;
    let matchingItem;
    products.forEach((product)=>{
        if(product.id === productId) {
            matchingItem = product;
        }
    });
    console.log(matchingItem);
    checkoutHTML += `
        <div class="cart-item-container">
        <div class="delivery-date">
        Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src="${matchingItem.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${matchingItem.name}
            </div>
            <div class="product-price">
            $${formatcurrency(matchingItem.priceCents)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
                Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options" n>
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            <div class="delivery-option">
            <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
            <div>
                <div class="delivery-option-date">
                Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                FREE Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
            <div>
                <div class="delivery-option-date">
                Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                $4.99 - Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
            <div>
                <div class="delivery-option-date">
                Monday, June 13
                </div>
                <div class="delivery-option-price">
                $9.99 - Shipping
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>`;
});

document.querySelector('.js-order-summary').innerHTML = checkoutHTML; 

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;
            removefromcart(productId);
        });
    });